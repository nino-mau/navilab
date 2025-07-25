import { eq } from 'drizzle-orm';
import 'dotenv/config';
import projectsPlaceholderData from './data/placeholderProjects.json';
import { project, user } from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';

/**
 * Insert placeholder data
 */
async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await db.execute(`TRUNCATE TABLE "project" RESTART IDENTITY CASCADE;`);

  const adminId = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.name, 'admin'));

  if (!adminId[0].id) console.log('No admin user found');

  await db.insert(project).values(
    projectsPlaceholderData.map((project) => ({
      ...project,
      managerId: adminId[0].id
    }))
  );

  console.log('✅ Seed Placeholder complete');
  return;
}
main();
