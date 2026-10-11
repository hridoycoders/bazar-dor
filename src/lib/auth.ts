import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUri = process.env.BETTER_AUTH_MONGO_URL;

if (!mongoUri) {
  throw new Error("BETTER_AUTH_MONGO_URL is missing");
}

const client = new MongoClient(mongoUri);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
