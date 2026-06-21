import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function dbConnect() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db("fable");
}

export async function POST(req) {
  try {
    const db = await dbConnect();
    const { ebookId, email } = await req.json();

    const ebook = await db.collection("ebooks").findOne({
      _id: new ObjectId(ebookId),
    });

    if (!ebook) {
      return NextResponse.json(
        { message: "Ebook not found" },
        { status: 404 }
      );
    }

    // ================= PREVENT SELF PURCHASE =================
    if (ebook.writerEmail === email) {
      return NextResponse.json(
        { message: "Writer cannot buy own ebook" },
        { status: 403 }
      );
    }

    // ================= CREATE STRIPE SESSION =================
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: ebook.title,
              description: ebook.description || "",
            },
            unit_amount: Math.round(Number(ebook.price) * 100),
          },
          quantity: 1,
        },
      ],

      // 🔥 IMPORTANT: MATCH WEBHOOK FIELD NAME
      metadata: {
        ebookId: String(ebookId),
        userEmail: String(email),
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/ebooks/${ebookId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/ebooks/${ebookId}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}