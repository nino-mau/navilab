import dayjs from 'dayjs';

/**
 * Calculate the time since a given date, return non verbose result
 */
export function timeSinceDate(date: string): string {
  const now = dayjs();
  const since = dayjs(date);

  const diffSeconds = now.diff(since, 'second');
  const diffMinutes = now.diff(since, 'minute');
  const diffHours = now.diff(since, 'hour');
  const diffDays = now.diff(since, 'day');
  const diffMonths = now.diff(since, 'month');
  const diffYears = now.diff(since, 'year');

  if (diffYears >= 1) {
    return diffYears + ` year${diffYears > 1 ? 's' : ''} ago`;
  } else if (diffMonths >= 1) {
    return diffMonths + ` month${diffMonths > 1 ? 's' : ''} ago`;
  } else if (diffDays >= 1) {
    return diffDays + ` day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours >= 1) {
    return diffHours + ` hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes >= 1) {
    return diffMinutes + ` minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    return diffSeconds + ` second${diffSeconds > 1 ? 's' : ''} ago`;
  }
}
