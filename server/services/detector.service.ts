import type { DetectorType } from '~~/shared/types/detector';
import db from '../db/client';
import { detector, project } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Fetch all detectors of specified user
 */
export async function fetchDetectorsById(userId: string) {
  const res = await db
    .select({
      id: detector.id,
      creatorId: detector.creatorId,
      projectId: detector.projectId,
      name: detector.name,
      serialNumber: detector.serialNumber,
      status: detector.status,
      type: detector.type,
      projectName: project.name,
      lastData: detector.lastData,
      password: detector.password
    })
    .from(detector)
    .leftJoin(project, eq(detector.projectId, project.id))
    .where(eq(detector.creatorId, userId));
  return res;
}

/**
 * Delete a detector by it's id
 */
export async function deleteDetectorById(detectorId: string) {
  const res = await db
    .delete(detector)
    .where(eq(detector.id, detectorId))
    .returning({ deletedId: detector.id });
  return res;
}

/**
 * Create a new detector field in database
 */
export async function createDetector(
  id: string,
  creatorId: string,
  name: string,
  serialNumber: string,
  type: DetectorType,
  hashedPassword: string
) {
  const res = await db
    .insert(detector)
    .values({
      id: id,
      creatorId: creatorId,
      name: name,
      serialNumber: serialNumber,
      type: type,
      password: hashedPassword
    })
    .returning({ insertId: detector.id });
  return res;
}
