import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import projectsData from './data/placeholder/projects.json';
import usersData from './data/placeholder/users.json';
import detectorsData from './data/placeholder/detectors.json';
import projectContributorData from './data/placeholder/projectContributors.json';
import projectInviteData from './data/placeholder/projectInvites.json';
import projectDetectorData from './data/placeholder/projectDetectors.json';
import projectRequestData from './data/placeholder/projectRequests.json';
import {
  detector,
  project,
  projectContributor,
  projectDetector,
  projectInvite,
  projectRequest,
  user
} from './schema';
import type { Invite } from '~~/shared/types/invite';

/**
 * Insert placeholder data in db
 */
async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  // Clear previous data
  await db.execute(`DELETE FROM "user" WHERE id ~ '^user([1-9]|1[0-9]|20)$';`);
  await db.execute(`TRUNCATE TABLE "project" RESTART IDENTITY CASCADE;`);
  await db.execute(`TRUNCATE TABLE "detector" RESTART IDENTITY CASCADE;`);
  await db.execute(
    `TRUNCATE TABLE "project_detector" RESTART IDENTITY CASCADE;`
  );
  await db.execute(
    `TRUNCATE TABLE "project_contributor" RESTART IDENTITY CASCADE;`
  );
  await db.execute(
    `TRUNCATE TABLE "project_request" RESTART IDENTITY CASCADE;`
  );
  await db.execute(`TRUNCATE TABLE "project_invite" RESTART IDENTITY CASCADE;`);

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

  // Insert data for project detectors, contributors, requests and invites
  await db.insert(projectContributor).values(projectContributorData);
  await db.insert(projectDetector).values(projectDetectorData);
  await db.insert(projectRequest).values(projectRequestData);
  await db.insert(projectInvite).values(projectInviteData as Invite[]);

  console.log('✅ Seed Placeholder complete');
  return;
}
main();
