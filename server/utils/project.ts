import dayjs from 'dayjs';

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
