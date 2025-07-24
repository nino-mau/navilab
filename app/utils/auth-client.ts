import { createAuthClient } from 'better-auth/vue';
import { adminClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NUXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [adminClient()]
});
