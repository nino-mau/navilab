import type { DetectorType } from '~~/shared/types/detector';
import db from '../db/client';
import { detector } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Fetch all detectors of specified user
 */
export async function fetchDetectorsById(userId: string) {
  const res = await db
    .select()
    .from(detector)
    .where(eq(detector.creatorId, userId));
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
