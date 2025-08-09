import dayjs from 'dayjs';
import type {
  ProjectContributorStatus,
  ProjectDetailsClient
} from '~~/shared/types/projects';

/**
 * Take start/end date of project and return it's status
 */
export function getProjectStatus(
  startDate: string,
  endDate: string
): ProjectStatus {
  if (dayjs() < dayjs(startDate)) return 'not started';
  if (dayjs() > dayjs(endDate)) return 'finished';
  return 'in progress';
}

/**
 * Set the activity status of each contributor in a project
 *
 * @description Criterias: contributor has active detectors, contributor has
 *   recent messages
 */
export function getProjectContributorStatus(projectData: ProjectDetailsClient) {
  return projectData.contributors.map((contributor) => {
    let status: ProjectContributorStatus = 'inactive';

    const detectors = projectData.detectors.filter(
      (detector) => detector.creatorId === contributor.id
    );

    /**
     * Check if contributor has active detectors
     */

    const activeDetectors = detectors.filter(
      (detector) => detector.status !== 'inactive'
    );

    if (activeDetectors.length > 0) status = 'active';

    return {
      ...contributor,
      status
    };
  });
}

/**
 * Remove contributors/detectors items that have null ids
 */
export function cleanProjectData(
  projectData: ProjectDetailsClient
): ProjectDetailsClient {
  return {
    ...projectData,
    contributors: projectData.contributors.filter(
      (contributor) => contributor.id !== null && contributor.id !== undefined
    ),
    detectors: projectData.detectors.filter(
      (detector) => detector.id !== null && detector.id !== undefined
    ),
    requests: projectData.requests.filter(
      (request) => request.id !== null && request.id !== undefined
    ),
    invites: projectData.invites.filter(
      (invite) => invite.id !== null && invite.id !== undefined
    )
  };
}
