import { and, eq, getTableColumns } from 'drizzle-orm';
import db from '~~/server/db/client';
import { projectRequest } from '~~/server/db/schema';
import type { RequestStatus } from '~~/shared/types/request';

export async function updateRequestStatus(
  requestId: string,
  projectId: string,
  status: RequestStatus
) {
  const res = db
    .update(projectRequest)
    .set({ status: status })
    .where(
      and(
        eq(projectRequest.projectId, projectId),
        eq(projectRequest.id, requestId)
      )
    )
    .returning({ updateId: projectRequest.id });
  return res;
}

export async function fetchRequest(requestId: string, projectId: string) {
  const res = db
    .select({
      ...getTableColumns(projectRequest)
    })
    .from(projectRequest)
    .where(
      and(
        eq(projectRequest.projectId, projectId),
        eq(projectRequest.id, requestId)
      )
    );
  return res;
}
