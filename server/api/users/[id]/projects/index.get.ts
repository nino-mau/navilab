import type { ProjectClient } from '#shared/types/projects';
import { fetchProjectsById } from '@server/services/project';
import { getProjectStatus } from '~~/server/utils/project';

/**
 * Return projects of a user
 *
 * @GET /api/users/[id]/projects
 */
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id');

  if (!userId)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId'
    });

  try {
    const projectsData = await fetchProjectsById(userId);

    setResponseStatus(event, 200);
    return projectsData.map((project) => {
      return {
        ...project,
        status: getProjectStatus(project.startDate, project.endDate)
      };
    }) as ProjectClient[];
  } catch (err) {
    const error = err as Error;
    console.error('[@GET /api/users/[id]/projects] \n', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
