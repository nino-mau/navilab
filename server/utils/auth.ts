import 'dotenv/config';
import { admin } from 'better-auth/plugins';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import db from '../db/client';
import { user, session, account, verification } from '../db/schema';

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { user, session, account, verification }
  }),
  plugins: [admin({ adminRoles: ['Admin', 'admin'] })]
});
