import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const rc = useRuntimeConfig();

const pool = new Pool({
  connectionString: rc.databaseUrl,
});

const db = drizzle(pool);

export default db;
