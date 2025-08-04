import db from '@server/db/client';
import { projectDetector } from '@server/db/schema';
import { and, eq } from 'drizzle-orm';

/**
 * Remove a detector from a project by id
 */
export async function removeDetector(detectorId: string, projectId: string) {
  const res = await db
    .delete(projectDetector)
    .where(
      and(
        eq(projectDetector.detectorId, detectorId),
        eq(projectDetector.projectId, projectId)
      )
    )
    .returning({ deletedId: projectDetector.detectorId });
  return res;
}
