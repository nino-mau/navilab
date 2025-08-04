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
