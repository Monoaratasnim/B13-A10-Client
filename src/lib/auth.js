import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Missing MONGODB_URI");

// Mongo Singleton (IMPORTANT FIX)
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

const dbClient = await clientPromise;
const db = dbClient.db("fable");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: dbClient,
  }),

    plugins: [
    jwt()
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
    },
  },

  hooks: {
    async afterSignUp(user) {
      await db.collection("users").updateOne(
        { email: user.email },
        {
          $set: {
            role: "user",
            createdAt: new Date(),
          },
        }
      );
    },
  },
  session: {
        cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge:60 * 24 * 30, 
    },
  },

  
});