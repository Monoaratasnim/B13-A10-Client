import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";


const uri = process.env.MONGODB_URI;

let client = new MongoClient(uri);
let clientPromise = client.connect();

export async function GET(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("fable");

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // purchases
   const purchases = await db
  .collection("purchases")
  .find({
    userEmail: email,
  })
  .toArray();

    // optional: enrich with ebook data
  const ebookIds = purchases.map((p) =>
  typeof p.ebookId === "string"
    ? new ObjectId(p.ebookId)
    : p.ebookId
);

    const ebooks = await db
      .collection("ebooks")
      .find({ _id: { $in: ebookIds } })
      .toArray();

    return NextResponse.json(
      ebooks.map((e) => {
        const purchase = purchases.find(
          (p) => p.ebookId.toString() === e._id.toString()
        );

        return {
          ...e,
          purchasedAt: purchase?.createdAt,
        };
      })
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}