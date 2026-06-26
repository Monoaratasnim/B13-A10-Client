import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Missing MONGODB_URI");

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

    const purchases = await db
      .collection("purchases")
      .aggregate([
        {
          $match: {
            userEmail: email,
          },
        },

        {
          $lookup: {
            from: "ebooks",
            localField: "ebookId",
            foreignField: "_id",
            as: "ebook",
          },
        },

        {
          $unwind: "$ebook",
        },

        {
          $project: {
            _id: 1,

            ebookId: 1,

            ebookTitle: "$ebook.title",

            writer: "$ebook.writerName",

            coverImage: "$ebook.coverImage",

            // ⭐ THIS WAS MISSING
            price: "$ebook.price",

            // Stripe stores cents
            amount: {
              $divide: ["$amount", 100],
            },

            createdAt: 1,

            status: {
              $literal: "Paid",
            },
          },
        },

        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    return NextResponse.json(purchases);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}