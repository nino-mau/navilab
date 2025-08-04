import { eq } from 'drizzle-orm';
import db from '../db/client';
import { user } from '../db/schema';

export async function fetchUserById(userId: string) {
  const res = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl
    })
    .from(user)
    .where(eq(user.id, userId));
  return res;
}
