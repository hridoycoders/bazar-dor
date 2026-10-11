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
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
