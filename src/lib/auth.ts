import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let db = null;

if (uri && !uri.includes('<db_username>')) {
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    db = client.db('bazardor');
  } catch (err) {
    console.error('MongoDB client initialization notice:', err);
  }
}

// Build social providers dynamically based on available credentials
const socialProviders: {
  google?: { clientId: string; clientSecret: string };
  github?: { clientId: string; clientSecret: string };
} = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  ...(db ? { database: mongodbAdapter(db) } : {}),
  secret: process.env.BETTER_AUTH_SECRET || 'MlUEyiTkuyDbXHLdxgW3a624NLTEUK1k',
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders,
});
