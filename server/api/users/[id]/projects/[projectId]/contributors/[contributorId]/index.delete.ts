import { removeDetectorsByContributor } from '~~/server/services/project';
import { removeContributor } from '~~/server/services/project/contributor.service';

/**
 * Remove a contributor from a project
 *
 * @DELETE /api/users/[id]/projects/[projectId]/contributors/[contributorId]
 */
export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, 'projectId');
  const contributorId = getRouterParam(event, 'contributorId');

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing projectId'
    });
  }

  if (!contributorId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing contributorId'
    });
  }

  // Remove contributor from project
  const contributorRes = await removeContributor(contributorId, projectId);

  if (!contributorRes.length || !contributorRes[0].deleteId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete contributor from project from database'
    });
  }

  // Remove contributor's detectors from project if he has any
  const detectorRes = await removeDetectorsByContributor(
    projectId,
    contributorId
  );
  console.log(detectorRes.map((detector) => detector.deleteId));

  setResponseStatus(event, 200);
  return {
    deletedContributorId: contributorRes[0].deleteId,
    deletedDetectorsId: detectorRes.map((detector) => detector.deleteId)
  };
});
