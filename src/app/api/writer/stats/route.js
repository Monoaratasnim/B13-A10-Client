import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

export async function GET(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("fable");

    // AUTH
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // 📚 Total ebooks by writer
    const totalEbooks = await db.collection("ebooks").countDocuments({
      writerEmail: email,
    });

    // 💰 Sales data
    const sales = await db.collection("purchases").find({
      writerEmail: email,
    }).toArray();

    const totalSales = sales.length;

    const totalRevenue = sales.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );

    return NextResponse.json({
      totalEbooks,
      totalSales,
      totalRevenue,
    });

  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}