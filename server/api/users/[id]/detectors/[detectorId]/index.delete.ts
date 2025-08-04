import { deleteDetectorById } from '~~/server/services/detector.service';

/**
 * Delete a detector from database
 *
 * @DELETE /api/users/[id]/detectors/[detectorId]
 */
export default defineEventHandler(async (event) => {
  const detectorId = getRouterParam(event, 'detectorId');

  if (!detectorId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing detectorId'
    });
  }

  // Delete from db
  const res = await deleteDetectorById(detectorId);

  if (!res.length || !res[0].deletedId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete detector from database'
    });
  }

  setResponseStatus(event, 204);
  return { deleteId: res[0].deletedId };
});
