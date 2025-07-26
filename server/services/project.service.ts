import { countDistinct, eq, getTableColumns } from 'drizzle-orm';
import db from '../db/client';
import {
  project,
  projectContributors,
  projectDetectors,
  projectInvite,
  projectRequest,
  specie
} from '../db/schema';

/**
 * Fetch all projects of specified user
 */
export async function fetchProjectsById(userId: string) {
  const res = await db
    .select({
      ...getTableColumns(project),
      contributorsCount: countDistinct(projectContributors.contributorId),
      detectorsCount: countDistinct(projectDetectors.detectorId),
      invitesCount: countDistinct(projectInvite.id),
      requestsCount: countDistinct(projectRequest.id),
      specieName: specie.name
    })
    .from(project)
    .leftJoin(
      projectContributors,
      eq(project.id, projectContributors.projectId)
    )
    .leftJoin(projectDetectors, eq(project.id, projectDetectors.projectId))
    .leftJoin(projectInvite, eq(project.id, projectInvite.projectId))
    .leftJoin(projectRequest, eq(project.id, projectRequest.projectId))
    .innerJoin(specie, eq(project.specieId, specie.id))
    .where(eq(project.managerId, userId))
    .groupBy(project.id, specie.name);
  return res;
}
