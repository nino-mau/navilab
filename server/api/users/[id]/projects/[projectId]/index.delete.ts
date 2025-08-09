import { deleteProjectById } from '@server/services/project';

/**
 * Delete a project from database
 *
 * @DELETE /api/users/[id]/projects/[projectId]
 */
export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'projectId');

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing projectId'
    });
  }

  // Delete from db
  const res = await deleteProjectById(projectId);

  if (!res.length || !res[0].deletedProjectId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete project from database'
    });
  }

  setResponseStatus(event, 204);
});
