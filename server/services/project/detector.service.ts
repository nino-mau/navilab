import db from '@server/db/client';
import { detector, projectDetector } from '@server/db/schema';
import { and, eq, inArray } from 'drizzle-orm';

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

/**
 * Remove detectors of a contributor from a project
 */
export async function removeDetectorsByContributor(
  projectId: string,
  contributorId: string
) {
  const res = await db
    .delete(projectDetector)
    .where(
      and(
        eq(projectDetector.projectId, projectId),
        inArray(
          projectDetector.detectorId,
          db
            .select({ detectorId: detector.id })
            .from(detector)
            .where(eq(detector.creatorId, contributorId))
        )
      )
    )
    .returning({ deleteId: projectDetector.detectorId });
  return res;
}
