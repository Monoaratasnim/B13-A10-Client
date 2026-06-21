import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function dbConnect() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db("fable");
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const ebookId = searchParams.get("ebookId");
    const email = searchParams.get("email");

    if (!ebookId || !email) {
      return NextResponse.json({ purchased: false });
    }

    const db = await dbConnect();

    const purchase = await db.collection("purchases").findOne({
      ebookId: new ObjectId(ebookId),
      email,
    });

    return NextResponse.json({
      purchased: !!purchase,
    });
  } catch (err) {
    return NextResponse.json(
      { purchased: false, error: err.message },
      { status: 500 }
    );
  }
}