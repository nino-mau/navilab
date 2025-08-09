import type { ProjectDetailsClient } from '#shared/types/projects';
import { fetchProjectById } from '@server/services/project';
import {
  cleanProjectData,
  getProjectContributorStatus,
  getProjectStatus
} from '~~/server/utils/project';

/**
 * Return detailed data on one project of a user
 *
 * @GET /api/users/[id]/projects/[projectId]
 */
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id');
  const projectId = getRouterParam(event, 'projectId');

  if (!userId)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing userId'
    });

  if (!projectId)
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing projectId'
    });

  try {
    const res = await fetchProjectById(projectId, userId);
    const rawProjectData = res[0] as ProjectDetailsClient;

    // Remove null items
    const cleanedProjectData = cleanProjectData(rawProjectData);

    // Set status of project and status of project contributors
    const projectData = {
      ...cleanedProjectData,
      status: getProjectStatus(
        cleanedProjectData.startDate,
        cleanedProjectData.endDate
      ),
      contributors: getProjectContributorStatus(cleanedProjectData)
    };

    setResponseStatus(event, 200);
    return projectData;
  } catch (err) {
    const error = err as Error;
    console.error('[@GET /api/users/[id]/projects/[projectId]] \n', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
