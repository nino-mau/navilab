import { fetchProjectsById } from '~~/server/services/project.service';
import dayjs from 'dayjs';
import type { ProjectClient, ProjectStatus } from '#shared/types/projects';

/**
 * Take start/end date of project and return it's status
 */

const getProjectStatus = (
  startDate: string,
  endDate: string
): ProjectStatus => {
  if (dayjs() < dayjs(startDate)) return 'not started';
  if (dayjs() > dayjs(endDate)) return 'finished';
  return 'in progress';
};

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
