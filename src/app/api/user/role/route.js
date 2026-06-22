import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

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

    // ================= CHECK ADMIN =================
    const currentUser = await db.collection("user").findOne({
      email: session.user.email,
    });

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin only" },
        { status: 403 }
      );
    }

    // ================= GET TARGET USER =================
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { message: "Email and role required" },
        { status: 400 }
      );
    }

    const allowedRoles = ["user", "writer", "admin"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { message: "Invalid role" },
        { status: 400 }
      );
    }

    // ================= UPDATE TARGET USER =================
    const result = await db.collection("user").updateOne(
      { email },
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
      message: "User role updated successfully",
    });

  } catch (err) {
    console.error("ROLE UPDATE ERROR:", err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}