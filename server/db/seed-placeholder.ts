import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import projectsData from './data/placeholder/projects.json';
import usersData from './data/placeholder/users.json';
import detectorsData from './data/placeholder/detectors.json';
import projectContributorsData from './data/placeholder/projectContributors.json';
import projectDetectorsData from './data/placeholder/projectDetectors.json';
import {
  detector,
  project,
  projectContributors,
  projectDetectors,
  user
} from './schema';

/**
 * Insert placeholder data in db
 */
async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  // Clear previous data
  await db.execute(`TRUNCATE TABLE "project" RESTART IDENTITY CASCADE;`);
  await db.execute(`TRUNCATE TABLE "detector" RESTART IDENTITY CASCADE;`);
  await db.execute(
    `TRUNCATE TABLE "project_detectors" RESTART IDENTITY CASCADE;`
  );
  await db.execute(
    `TRUNCATE TABLE "project_contributors" RESTART IDENTITY CASCADE;`
  );

  // Insert placeholder users
  await db.insert(user).values(
    usersData.map((u) => ({
      ...u,
      role: u.role as 'Contributor' | 'Product Manager' | 'Admin'
    }))
  );

  // Insert placeholder detectors
  await db.insert(detector).values(
    detectorsData.map((d) => ({
      ...d,
      type: d.type as 'Human' | 'Audio' | 'Video',
      status: d.status as 'online' | 'offline' | 'inactive'
    }))
  );

  // Insert placeholder projects on admin user
  const adminId = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.name, 'admin'));

  if (!adminId[0].id) console.log('No admin user found');

  await db.insert(project).values(
    projectsData.map((project) => ({
      ...project,
      managerId: adminId[0].id
    }))
  );

  // Insert data for project detectors and contributors
  await db.insert(projectContributors).values(projectContributorsData);
  await db.insert(projectDetectors).values(projectDetectorsData);

  console.log('✅ Seed Placeholder complete');
  return;
}
main();
