import { eq, getTableColumns } from 'drizzle-orm';
import db from '../db/client';
import { project, projectInvite, user } from '../db/schema';
import { getISOFormatDateQuery } from '../utils/db';

/**
 * Fetch invites to all projects of a user by user id
 */
export async function fetchInvitesById(userId: string) {
  const res = db
    .select({
      ...getTableColumns(projectInvite),
      createdAt: getISOFormatDateQuery(projectInvite.createdAt),
      projectName: project.name,
      receiverName: user.name,
      receiverEmail: user.email
    })
    .from(project)
    .innerJoin(projectInvite, eq(project.id, projectInvite.projectId))
    .innerJoin(user, eq(projectInvite.receiverId, user.id))
    .where(eq(project.managerId, userId));
  return res;
}
