import { eq } from 'drizzle-orm';
import db from '../db/client';
import { user } from '../db/schema';

export default defineNitroPlugin(async () => {
  /**
   * Create admin user
   */

  const existing = await db
    .select()
    .from(user)
    .where(eq(user.email, 'admin@t.com'));
  if (existing.length === 0) {
    await auth.api.createUser({
      body: {
        email: 'admin@t.com',
        password: '118234',
        name: 'admin',
        role: 'Admin' as any // eslint-disable-line
      }
    });
  }
});
