export default defineNuxtRouteMiddleware(async (to) => {
  const session = await authClient.getSession();

  if (['/', '/login', '/register'].includes(to.path)) return;

  if (!session.data) return navigateTo('/');
});
