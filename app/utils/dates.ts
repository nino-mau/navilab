import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

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

/**
 * Calculate the remaining time between now to a specific end date
 */
export function timeRemaining(endDate: string) {
  dayjs.extend(relativeTime);
  dayjs.locale('en', {
    relativeTime: {
      future: '%s remains',
      past: '%s ago',
      s: '1 second',
      m: '1 minute',
      mm: '%d minutes',
      h: '1 hour',
      hh: '%d hours',
      d: '1 day',
      dd: '%d days',
      M: '1 month',
      MM: '%d months',
      y: '1 year',
      yy: '%d years'
    }
  });
  return dayjs().to(endDate);
}

/**
 * Calculate the percentage of progress between two dates based on current date
 */
export function progressBetweenDates(
  startDate: string,
  endDate: string
): number {
  const current = dayjs();
  const end = dayjs(endDate);
  const start = dayjs(startDate);
  const duration = end.diff(start);
  const elapsed = current.diff(start);

  if (current > end || current < start) return 0;

  return elapsed / (duration / 100);
}
