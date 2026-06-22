import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI missing");
}

let client = new MongoClient(uri);
let clientPromise = client.connect();

export async function GET(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("fable");

    // ✅ SESSION
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // ✅ YOUR REAL COLLECTION
    const user = await db.collection("user").findOne({ email });

    // purchases
    const purchases = await db
      .collection("purchases")
      .find({ email })
      .toArray();

    return NextResponse.json({
      totalPurchases: purchases.length,
      totalSpent: purchases.reduce((sum, p) => sum + (p.amount || 0), 0) / 100,
      bookmarks: user?.bookmarks?.length || 0,
    });

  } catch (err) {
    console.log("STATS ERROR:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}