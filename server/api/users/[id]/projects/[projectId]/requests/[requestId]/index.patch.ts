import z from 'zod';
import { insertContributor } from '~~/server/services/project/contributor.service';
import {
  fetchRequest,
  updateRequestStatus
} from '~~/server/services/project/request.service';
import { fetchUserById } from '~~/server/services/user.service';

const validateBody = z.object({
  action: z.enum(['accept', 'refuse'])
});

/**
 * Accept or refuse a request to join a project
 *
 * @PATCH /api/users/[id]/projects/[projectId]/requests/[requestId]
 */
export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'projectId');
  const requestId = getRouterParam(event, 'requestId');

  const { action } = await readValidatedBody(event, validateBody.parse);

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing projectId'
    });
  }

  if (!requestId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing requestId'
    });
  }

  /**
   * Handle accept action
   */
  if (action === 'accept') {
    // Fetch request data
    const requestData = await fetchRequest(requestId, projectId);

    if (!requestData.length) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch project request status from database'
      });
    }

    // Check if request isn't already accepted/refused
    if (requestData[0].status !== 'pending') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Request is already accepted or refused'
      });
    }

    // Insert contributor in database
    const insertId = await insertContributor(
      requestData[0].requesterId,
      projectId
    );

    if (!insertId.length || !insertId[0].insertId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to insert contributor in project in database'
      });
    }

    // Set request status to accepted
    const updateId = await updateRequestStatus(
      requestId,
      projectId,
      'accepted'
    );

    if (!updateId.length || !updateId[0].updateId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update request status in database'
      });
    }

    // Fetch details of added contributor to return to client
    const contributorDetails = await fetchUserById(requestData[0].requesterId);

    setResponseStatus(event, 201);
    return { contributorDetails: contributorDetails[0] };
  }

  /**
   * Handle refuse action
   */
  if (action === 'refuse') {
    // Set request status to refused
    const updateId = await updateRequestStatus(requestId, projectId, 'refused');

    if (!updateId.length || !updateId[0].updateId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update request status in database'
      });
    }

    setResponseStatus(event, 201);
    return { contributorDetails: undefined };
  }
});
