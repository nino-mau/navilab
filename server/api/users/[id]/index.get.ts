import { fetchUserById } from '@server/services/user.service';

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id');

  if (!userId)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId'
    });

  const userData = await fetchUserById(userId);

  if (!userData || !userData.length)
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });

  return userData;
});
