import { eq } from 'drizzle-orm';
import db from '../db/client';
import { user } from '../db/schema';

export async function fetchUserById(userId: string) {
  const res = await db
    .select({
      username: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl
    })
    .from(user)
    .where(eq(user.id, userId));
  console.log(res);
  return res;
}
