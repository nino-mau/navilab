import { fetchDetectorsById } from '~~/server/services/detector.service';

/**
 * Return detectors of a user
 *
 * @GET /api/users/[id]/detectors
 */
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id');

  if (!userId)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId'
    });

  try {
    const detectorsData = await fetchDetectorsById(userId);

    setResponseStatus(event, 200);
    return detectorsData;
  } catch (err) {
    const error = err as Error;
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
