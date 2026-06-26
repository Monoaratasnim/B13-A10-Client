import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI missing");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function GET(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("fable");

    // Logged in user
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = session.user.email;

    // User document
    const user = await db.collection("user").findOne({
      email,
    });

    // Purchases
    const purchases = await db
      .collection("purchases")
      .find({
        userEmail: email, // ✅ Correct field
      })
      .toArray();

    const totalPurchases = purchases.length;

    const totalSpent = purchases.reduce((sum, purchase) => {
      return sum + (purchase.amount || 0);
    }, 0);

    return NextResponse.json({
      totalPurchases,
      totalSpent: totalSpent / 100, // convert cents to dollars
      bookmarks: user?.bookmarks?.length || 0,
    });
  } catch (err) {
    console.error("Stats Error:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}