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


  /**
   * Insert placeholder data
   */

  const adminId = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(eq(schema.user.name, 'admin'));

  if (!adminId[0].id) console.log('No admin user found');

  await db.insert(schema.project).values(
    projectsPlaceholderData.map((project) => ({
      ...project,
      managerId: adminId[0].id
    }))
  );

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
