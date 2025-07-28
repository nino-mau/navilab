import type { RequestClient } from '#shared/types/request';
import { fetchRequestsById } from '~~/server/services/request.service';

/**
 * Return all requests to projects of a user
 *
 * @GET /api/users/[id]/requests
 */
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id');

  if (!userId)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId'
    });

  try {
    const requestsData = await fetchRequestsById(userId);

    setResponseStatus(event, 200);
    return requestsData as RequestClient[];
  } catch (err) {
    const error = err as Error;
    console.error('[@GET /api/users/[id]/requests] \n', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
