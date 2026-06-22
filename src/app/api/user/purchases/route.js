import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Missing MONGODB_URI");

let client = new MongoClient(uri);
let clientPromise = client.connect();

export async function GET(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("fable");

    // ✅ session
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    // ✅ join purchases + ebooks
    const purchases = await db.collection("purchases").aggregate([
      { $match: { email } },

      {
        $lookup: {
          from: "ebooks",
          localField: "ebookId",
          foreignField: "_id",
          as: "ebook"
        }
      },

      { $unwind: "$ebook" },

      {
        $project: {
          _id: 1,
          amount: 1,
          createdAt: 1,
          ebookId: 1,

          ebookTitle: "$ebook.title",
          writer: "$ebook.writerEmail",
          price: "$ebook.price"
        }
      },

      { $sort: { createdAt: -1 } }
    ]).toArray();

    return NextResponse.json(purchases);

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}