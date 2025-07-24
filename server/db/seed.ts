import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';
import * as schema from './schema';

export default async function seedDb() {
  const db = drizzle(process.env.POSTGRES_DB_URL!);

  // Clear verification table before seeding
  await db.execute(`TRUNCATE TABLE "verification" RESTART IDENTITY CASCADE;`);
  await db.execute(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;`);

  // Create placeholder users
  await seed(db, schema).refine(() => ({
    user: {
      count: 5,
      with: {
        detector: 3
      }
    }
  }));

  console.log('✅ Seed complete');
}
