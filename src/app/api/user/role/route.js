import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

// ================= CONNECTION CACHE =================
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing in environment variables");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// ================= PATCH ROUTE =================
export async function PATCH(req) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("fable");

    // ================= GET SESSION =================
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ================= VALIDATE ROLE =================
    const { role } = await req.json();

    const allowedRoles = ["user", "writer", "admin"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { message: "Invalid role" },
        { status: 400 }
      );
    }

    // ================= UPDATE USER ROLE =================
    const result = await db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: {
          role,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Role updated successfully",
    });
  } catch (err) {
    console.error("ROLE UPDATE ERROR:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}