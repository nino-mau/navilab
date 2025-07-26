import { fetchDetectorsById } from '~~/server/services/detector.service';
import type { DetectorClient } from '~~/shared/types/detector';

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
    return detectorsData.map(
      ({ password, ...rest }) => rest
    ) as DetectorClient[];
  } catch (err) {
    const error = err as Error;
    console.error('[@GET /api/users/[id]/detectors] \n', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
