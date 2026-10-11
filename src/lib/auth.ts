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

export const auth = betterAuth({
  ...(db ? { database: mongodbAdapter(db) } : {}),
  secret: process.env.BETTER_AUTH_SECRET || 'MlUEyiTkuyDbXHLdxgW3a624NLTEUK1k',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-secret',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || 'demo-github-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'demo-github-secret',
    },
  },
});
