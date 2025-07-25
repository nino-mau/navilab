import { auth } from '@server/utils/auth'; // import your auth config

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
