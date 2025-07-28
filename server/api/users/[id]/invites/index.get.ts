import { fetchInvitesById } from '~~/server/services/invite.service';

/**
 * Return all invites to projects of a user
 *
 * @GET /api/users/[id]/invites
 */
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id');

  if (!userId)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId'
    });

  try {
    const invitesData = await fetchInvitesById(userId);

    setResponseStatus(event, 200);
    return invitesData as InviteClient[];
  } catch (err) {
    const error = err as Error;
    console.error('[@GET /api/users/[id]/invites] \n', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
