import { createAuthClient } from 'better-auth/vue';

const rc = useRuntimeConfig();

export const authClient = createAuthClient({
  baseURL: rc.public.betterAuthUrl,
});
