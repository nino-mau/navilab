import { and, countDistinct, eq, getTableColumns, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import db from '../db/client';
import {
  detector,
  project,
  projectContributor,
  projectDetector,
  projectInvite,
  projectRequest,
  specie,
  user
} from '../db/schema';
import { getISOFormatDateQuery } from '../utils/db';

/**
 * Fetch a project of specified user
 */
export async function fetchProjectById(projectId: string, userId: string) {
  const requesterUser = alias(user, 'requester_user');
  const detectorUser = alias(user, 'detector_user');
  const managerUser = alias(user, 'manager_user');

  const res = await db
    .select({
      ...getTableColumns(project),
      managerEmail: managerUser.email,
      startDate: getISOFormatDateQuery(project.startDate),
      endDate: getISOFormatDateQuery(project.endDate),
      specieName: specie.name,
      lastUpdate: getISOFormatDateQuery(project.lastUpdate),
      contributors:
        sql`json_agg(DISTINCT jsonb_build_object('id', ${user.id}, 'name', ${user.name}, 'email', ${user.email}))`.as(
          'contributors'
        ),
      detectors:
        sql`json_agg(DISTINCT jsonb_build_object('id', ${detector.id}, 'name', ${detector.name}, 'serialNumber', ${detector.serialNumber}, 'type', ${detector.type}, 'status', ${detector.status}, 'model', ${detector.model}, 'brand', ${detector.brand}, 'lastData', ${getISOFormatDateQuery(detector.lastData)}, 'creatorId', ${detector.creatorId}, 'creatorEmail', ${detectorUser.email}))`.as(
          'detectors'
        ),
      requests:
        sql`json_agg(DISTINCT jsonb_build_object('id', ${projectRequest.id}, 'projectId', ${projectRequest.projectId}, 'requesterId', ${projectRequest.requesterId}, 'status', ${projectRequest.status}, 'message', ${projectRequest.message}, 'createdAt', ${getISOFormatDateQuery(projectRequest.createdAt)}, 'requesterName', ${requesterUser.name}, 'requesterEmail', ${requesterUser.email}))`.as(
          'requests'
        ),
      invites:
        sql`json_agg(DISTINCT jsonb_build_object('id', ${projectInvite.id}, 'projectId', ${projectInvite.projectId}, 'status', ${projectInvite.status}, 'message', ${projectInvite.message}, 'receiverId', ${projectInvite.receiverId}, 'createdAt', ${getISOFormatDateQuery(projectInvite.createdAt)}))`.as(
          'invites'
        )
    })
    .from(project)
    .leftJoin(projectContributor, eq(project.id, projectContributor.projectId))
    .leftJoin(projectDetector, eq(project.id, projectDetector.projectId))
    .leftJoin(projectRequest, eq(project.id, projectRequest.projectId))
    .leftJoin(requesterUser, eq(projectRequest.requesterId, requesterUser.id))
    .leftJoin(projectInvite, eq(project.id, projectInvite.projectId))
    .innerJoin(specie, eq(project.specieId, specie.id))
    .innerJoin(user, eq(projectContributor.contributorId, user.id))
    .innerJoin(detector, eq(projectDetector.detectorId, detector.id))
    .leftJoin(detectorUser, eq(detector.creatorId, detectorUser.id))
    .innerJoin(managerUser, eq(project.managerId, managerUser.id))
    .where(and(eq(project.managerId, userId), eq(project.id, projectId)))
    .groupBy(project.id, specie.name, managerUser.email);
  return res;
}

/**
 * Fetch all projects of specified user
 */
export async function fetchProjectsById(userId: string) {
  const res = await db
    .select({
      ...getTableColumns(project),
      lastUpdate: getISOFormatDateQuery(project.lastUpdate),
      startDate: getISOFormatDateQuery(project.startDate),
      endDate: getISOFormatDateQuery(project.endDate),
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
