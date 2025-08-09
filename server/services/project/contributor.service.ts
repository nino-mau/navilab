import { and, eq } from 'drizzle-orm';
import db from '~~/server/db/client';
import { projectContributor } from '~~/server/db/schema';

export async function insertContributor(
  contributorId: string,
  projectId: string
) {
  const res = db
    .insert(projectContributor)
    .values({ contributorId: contributorId, projectId: projectId })
    .returning({ insertId: projectContributor.contributorId });
  return res;
}

export async function removeContributor(
  contributorId: string,
  projectId: string
) {
  const res = db
    .delete(projectContributor)
    .where(
      and(
        eq(projectContributor.projectId, projectId),
        eq(projectContributor.contributorId, contributorId)
      )
    )
    .returning({ deleteId: projectContributor.contributorId });
  return res;
}
