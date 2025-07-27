import { eq, getTableColumns } from 'drizzle-orm';
import db from '../db/client';
import { project, projectRequest } from '../db/schema';

/**
 * Fetch  requests to all projects of a user by user id
 */
export async function fetchRequestsById(userId: string) {
  const res = db
    .select({ ...getTableColumns(projectRequest) })
    .from(project)
    .innerJoin(projectRequest, eq(project.id, projectRequest.projectId))
    .where(eq(project.managerId, userId));
  return res;
}
