import type { CalendarLinks } from '../schemas/interfaces/calendar-links';
import type { CreateEventOptions } from '../schemas/interfaces/create-event-options';
import type { CalendarDayViewProvider } from '../schemas/types/calendar-day-view-provider';

import { formatDateOnlyLocal, formatDateTimeUtc, resolveEndDate, toRRule } from './ics';

/**
 * Builds links that open a web calendar with the event already filled in.
 * The user must confirm in the web calendar. Nothing is saved without that step.
 *
 * Supported fields: `title`, `startDate`, `endDate`, `duration`, `isAllDay`, `description`, `location`.
 * Google Calendar also gets `recurrence` and `attendees`. Alerts and `availability` are not part of any link.
 * Outlook and Yahoo links ignore `recurrence`.
 *
 * @example
 * const { google, outlook } = getCalendarLinks({ title: 'Team standup', startDate: Date.now() });
 * window.open(google, '_blank', 'noopener');
 *
 * @since 8.12.0
 */
export function getCalendarLinks(options: CreateEventOptions): CalendarLinks {
  const startDate = options.startDate ?? Date.now();
  const isAllDay = options.isAllDay === true;
  const endDate = resolveEndDate(startDate, options.endDate, options.duration, isAllDay);

  return {
    google: buildGoogleLink(options, startDate, endDate, isAllDay),
    outlook: buildOutlookLink('https://outlook.live.com', options, startDate, endDate, isAllDay),
    office365: buildOutlookLink('https://outlook.office.com', options, startDate, endDate, isAllDay),
    yahoo: buildYahooLink(options, startDate, endDate, isAllDay),
  };
}

/**
 * Builds the link that opens the day view of a web calendar.
 *
 * @throws If `provider` is not `google`, `outlook`, or `office365`.
 *
 * @since 8.12.0
 */
export function getCalendarDayLink(provider: CalendarDayViewProvider, date: number): string {
  const day = new Date(date);
  const datePath = `${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`;
  switch (provider) {
    case 'google':
      return `https://calendar.google.com/calendar/r/day/${datePath}`;
    case 'outlook':
      return `https://outlook.live.com/calendar/0/view/day/${datePath}`;
    case 'office365':
      return `https://outlook.office.com/calendar/0/view/day/${datePath}`;
    default:
      throw new Error(`Unsupported calendar provider: ${String(provider)}. Use google, outlook, or office365.`);
  }
}

function buildGoogleLink(options: CreateEventOptions, startDate: number, endDate: number, isAllDay: boolean): string {
  const params = new URLSearchParams();
  params.set('action', 'TEMPLATE');
  params.set('text', options.title);
  params.set('dates', `${formatCompactDate(startDate, isAllDay)}/${formatCompactDate(endDate, isAllDay)}`);
  setIfPresent(params, 'details', options.description);
  setIfPresent(params, 'location', options.location);
  if (options.recurrence != null) {
    params.set('recur', `RRULE:${toRRule(options.recurrence, isAllDay)}`);
  }
  const emails = (options.attendees ?? []).map((guest) => guest.email).filter((email) => email.length > 0);
  if (emails.length > 0) {
    params.set('add', emails.join(','));
  }
  return `https://calendar.google.com/calendar/render?${toQuery(params)}`;
}

function buildOutlookLink(
  host: string,
  options: CreateEventOptions,
  startDate: number,
  endDate: number,
  isAllDay: boolean,
): string {
  const params = new URLSearchParams();
  params.set('path', '/calendar/action/compose');
  params.set('rru', 'addevent');
  params.set('subject', options.title);
  params.set('startdt', isAllDay ? formatIsoDate(startDate) : new Date(startDate).toISOString());
  params.set('enddt', isAllDay ? formatIsoDate(endDate) : new Date(endDate).toISOString());
  if (isAllDay) {
    params.set('allday', 'true');
  }
  setIfPresent(params, 'body', options.description);
  setIfPresent(params, 'location', options.location);
  return `${host}/calendar/0/deeplink/compose?${toQuery(params)}`;
}

function buildYahooLink(options: CreateEventOptions, startDate: number, endDate: number, isAllDay: boolean): string {
  const params = new URLSearchParams();
  params.set('v', '60');
  params.set('title', options.title);
  params.set('st', formatCompactDate(startDate, isAllDay));
  if (isAllDay) {
    params.set('dur', 'allday');
  } else {
    params.set('et', formatCompactDate(endDate, false));
  }
  setIfPresent(params, 'desc', options.description);
  setIfPresent(params, 'in_loc', options.location);
  return `https://calendar.yahoo.com/?${toQuery(params)}`;
}

/**
 * Encodes spaces as `%20`, not `+`.
 * Outlook shows a literal `+` when the link goes through its sign-in redirect.
 */
function toQuery(params: URLSearchParams): string {
  return [...params].map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
}

function setIfPresent(params: URLSearchParams, key: string, value: string | undefined): void {
  if (value != null && value.length > 0) {
    params.set(key, value);
  }
}

function formatCompactDate(ms: number, isAllDay: boolean): string {
  return isAllDay ? formatDateOnlyLocal(ms) : formatDateTimeUtc(ms);
}

function formatIsoDate(ms: number): string {
  const compact = formatDateOnlyLocal(ms);
  return `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`;
}
