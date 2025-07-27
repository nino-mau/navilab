import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

/**
 * Calculate the time since a given date, return non verbose result
 */
export function timeSinceDate(date: string): string {
  dayjs.extend(relativeTime);
  dayjs.locale('en', {
    relativeTime: {
      future: '%s ago',
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
  return dayjs(date).to(dayjs());
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

  if (current < start) return 0;
  if (current > end) return 100;

  return elapsed / (duration / 100);
}
