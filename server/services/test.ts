import { sql } from 'drizzle-orm';
import db from '../db/client';

export async function showTables() {
  const result = await db.execute(
    sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  );
  return result;
}
