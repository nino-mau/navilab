import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
// import { seed } from 'drizzle-seed';
import projectsPlaceholderData from './data/placeholderProjects.json';
import speciesData from './data/species.json';
import * as schema from './schema';

export default async function seed() {
  const db = drizzle(process.env.POSTGRES_DB_URL!);

  await db.execute(`TRUNCATE TABLE "specie" RESTART IDENTITY CASCADE;`);
  await db.execute(`TRUNCATE TABLE "project" RESTART IDENTITY CASCADE;`);






  // // Clear verification table before seeding
  // await db.execute(`TRUNCATE TABLE "verification" RESTART IDENTITY CASCADE;`);
  // await db.execute(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;`);
  //
  // // Create placeholder users
  // await seed(db, schema).refine(() => ({
  //   user: {
  //     count: 5,
  //     with: {
  //       detector: 3
  //     }
  //   }
  // }));

  console.log('✅ Seed complete');
}
