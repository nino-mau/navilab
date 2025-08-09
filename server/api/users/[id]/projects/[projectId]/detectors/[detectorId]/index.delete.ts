import { removeDetector } from '@server/services/project';

/**
 * Remove a detector from a project
 *
 * @DELETE /api/users/[id]/projects/[projectId/detectors/[detectorId]
 */
export default defineEventHandler(async (event) => {
  const detectorId = getRouterParam(event, 'detectorId');
  const projectId = getRouterParam(event, 'projectId');

  if (!detectorId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing detectorId'
    });
  }

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing projectId'
    });
  }

  // Delete from db
  const res = await removeDetector(detectorId, projectId);

  if (!res.length || !res[0].deletedId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to remove detector from project from database'
    });
  }

  setResponseStatus(event, 204);
});
