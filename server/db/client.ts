import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Use environment variable directly when running outside of Nuxt context
// (e.g., when Better Auth CLI is running)
let databaseUrl: string;
try {
  const rc = useRuntimeConfig();
  databaseUrl = rc.databaseUrl;
} catch {
  databaseUrl = process.env.POSTGRES_DB_URL!;
}

const pool = new Pool({
  connectionString: databaseUrl,
});

const db = drizzle(pool);

export default db;
