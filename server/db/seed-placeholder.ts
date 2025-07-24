import { eq } from 'drizzle-orm';
import db from './client';
import projectsPlaceholderData from './data/placeholderProjects.json';
import { user, project } from './schema';

/**
 * Insert placeholder data
 */
export default async function seedPlaceholder() {
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
}
