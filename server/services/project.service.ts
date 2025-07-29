import { countDistinct, eq, getTableColumns } from 'drizzle-orm';
import db from '../db/client';
import {
  project,
  projectContributor,
  projectDetector,
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
      contributorsCount: countDistinct(projectContributor.contributorId),
      detectorsCount: countDistinct(projectDetector.detectorId),
      invitesCount: countDistinct(projectInvite.id),
      requestsCount: countDistinct(projectRequest.id),
      specieName: specie.name
    })
    .from(project)
    .leftJoin(projectContributor, eq(project.id, projectContributor.projectId))
    .leftJoin(projectDetector, eq(project.id, projectDetector.projectId))
    .leftJoin(projectInvite, eq(project.id, projectInvite.projectId))
    .leftJoin(projectRequest, eq(project.id, projectRequest.projectId))
    .innerJoin(specie, eq(project.specieId, specie.id))
    .where(eq(project.managerId, userId))
    .groupBy(project.id, specie.name);
  return res;
}

/**
 * Delete a project by it's id
 */
export async function deleteProjectById(projectId: string) {
  const res = await db
    .delete(project)
    .where(eq(project.id, projectId))
    .returning({ deletedProjectId: project.id });
  return res;
}

/**
 * Create a project
 */
export async function createProject(
  id: string,
  managerId: string,
  name: string,
  description: string,
  locationLabel: string,
  specieId: string,
  isPrivate: boolean,
  startDate: string,
  endDate: string
) {
  const res = await db
    .insert(project)
    .values({
      id: id,
      managerId: managerId,
      name: name,
      description: description,
      locationLabel: locationLabel,
      specieId: specieId,
      private: isPrivate,
      startDate: startDate,
      endDate: endDate
    })
    .returning({ insertId: project.id });
  return res;
}
