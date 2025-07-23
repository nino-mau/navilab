import { fetchUserDetectors } from '~~/server/services/detector.service';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  });

  if (!session?.user) {
    throw createError({
      statusCode: 500,
      statusMessage: "Can't access user session"
    });
  }
  const res = await fetchUserDetectors(session?.user.id);
  return res;
});
