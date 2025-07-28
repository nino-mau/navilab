import { eq, getTableColumns } from 'drizzle-orm';
import db from '../db/client';
import { project, projectRequest, user } from '../db/schema';
import { getISOFormatDateQuery } from '../utils/db';

/**
 * Fetch  requests to all projects of a user by user id
 */
export async function fetchRequestsById(userId: string) {
  const res = db
    .select({
      ...getTableColumns(projectRequest),
      createdAt: getISOFormatDateQuery(projectRequest.createdAt),
      projectName: project.name,
      requesterName: user.name,
      requesterEmail: user.email
    })
    .from(project)
    .innerJoin(projectRequest, eq(project.id, projectRequest.projectId))
    .innerJoin(user, eq(projectRequest.requesterId, user.id))
    .where(eq(project.managerId, userId));
  return res;
}
