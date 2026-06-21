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
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook Error:", err.message);
      return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }

    // ================= PAYMENT SUCCESS =================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const ebookId = session.metadata?.ebookId;
      const email = session.metadata?.userEmail;

      if (!ebookId || !email) {
        return NextResponse.json(
          { error: "Missing metadata" },
          { status: 400 }
        );
      }

      const db = await dbConnect();

      const safeEbookId = new ObjectId(String(ebookId));

      // ================= SAVE PURCHASE =================
      await db.collection("purchases").updateOne(
        {
          ebookId: safeEbookId,
          email,
        },
        {
          $setOnInsert: {
            ebookId: safeEbookId,
            email,
            amount: session.amount_total,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );

      // ================= UPDATE EBOOK =================
      await db.collection("ebooks").updateOne(
        { _id: safeEbookId },
        {
          $set: {
            sold: true,
          },
        }
      );

      console.log("✅ Purchase saved for:", email);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}