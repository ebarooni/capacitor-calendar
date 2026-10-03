import { EventAvailability } from '../schemas/enums/event-availability';
import type { CreateEventOptions } from '../schemas/interfaces/create-event-options';
import type { EventRecurrenceRule } from '../schemas/interfaces/event-recurrence-rule';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const CRLF = '\r\n';

/**
 * Builds an RFC 5545 `VCALENDAR` document with one `VEVENT` from CreateEventOptions.
 * End comes from `endDate`, else `duration` (RFC 2445), else one hour (or next day if all-day).
 * All-day ends that fall on the start's local day bump to the next day (exclusive `DTEND`).
 */
export function buildEventIcs(options: CreateEventOptions): string {
  const startDate = options.startDate ?? Date.now();
  const isAllDay = options.isAllDay === true;
  const endDate = resolveEndDate(startDate, options.endDate, options.duration, isAllDay);

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ebarooni/capacitor-calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${generateUid()}`,
    `DTSTAMP:${formatDateTimeUtc(Date.now())}`,
  ];

  if (isAllDay) {
    lines.push(`DTSTART;VALUE=DATE:${formatDateOnlyLocal(startDate)}`);
    lines.push(`DTEND;VALUE=DATE:${formatDateOnlyLocal(endDate)}`);
  } else {
    lines.push(`DTSTART:${formatDateTimeUtc(startDate)}`);
    lines.push(`DTEND:${formatDateTimeUtc(endDate)}`);
  }

  lines.push(`SUMMARY:${escapeText(options.title)}`);

  if (options.description != null && options.description.length > 0) {
    lines.push(`DESCRIPTION:${escapeText(options.description)}`);
  }
  if (options.location != null && options.location.length > 0) {
    lines.push(`LOCATION:${escapeText(options.location)}`);
  }
  if (options.url != null && options.url.length > 0) {
    lines.push(`URL:${escapeText(options.url)}`);
  }
  if (options.organizer != null && options.organizer.length > 0) {
    lines.push(`ORGANIZER:mailto:${escapeText(options.organizer)}`);
  }

  const transp = mapTransparency(options.availability);
  if (transp != null) {
    lines.push(`TRANSP:${transp}`);
  }

  if (options.recurrence != null) {
    lines.push(`RRULE:${toRRule(options.recurrence, isAllDay)}`);
  }

  if (options.attendees != null) {
    for (const guest of options.attendees) {
      if (guest.email.length === 0) {
        continue;
      }
      const cn = guest.name != null && guest.name.length > 0 ? `;CN=${formatParamValue(guest.name)}` : '';
      lines.push(`ATTENDEE${cn}:mailto:${escapeText(guest.email)}`);
    }
  }

  if (options.alerts != null) {
    for (const minutes of options.alerts) {
      lines.push(...buildAlarm(minutes));
    }
  }

  lines.push('END:VEVENT', 'END:VCALENDAR');

  return lines.map(foldLine).join(CRLF) + CRLF;
}

/**
 * Resolves the `.ics` download filename.
 * Uses `icsFileName` when set; otherwise derives a name from `title` (fallback `event.ics`).
 * Appends `.ics` when the chosen name has no such extension.
 */
export function resolveIcsFileName(options: Pick<CreateEventOptions, 'icsFileName' | 'title'>): string {
  const custom = options.icsFileName?.trim();
  if (custom != null && custom.length > 0) {
    return /\.ics$/i.test(custom) ? custom : `${custom}.ics`;
  }
  return fileNameFromTitle(options.title);
}

function fileNameFromTitle(title?: string): string {
  const base = (title ?? 'event')
    .trim()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
  return `${base.length > 0 ? base : 'event'}.ics`;
}

function resolveEndDate(
  startDate: number,
  endDate: number | undefined,
  duration: string | undefined,
  isAllDay: boolean,
): number {
  let resolved: number;
  if (endDate != null) {
    resolved = endDate;
  } else if (duration != null && duration.trim().length > 0) {
    resolved = startDate + parseRfc2445DurationMs(duration.trim());
  } else {
    resolved = isAllDay ? startDate + DAY_MS : startDate + HOUR_MS;
  }

  if (!isAllDay) {
    return resolved;
  }

  // ICS all-day DTEND is exclusive; same local date as DTSTART is zero-length.
  // Also covers short durations (e.g. PT1H) on all-day events — treat as one whole day.
  if (formatDateOnlyLocal(resolved) <= formatDateOnlyLocal(startDate)) {
    return startDate + DAY_MS;
  }
  return resolved;
}

/**
 * Parses an RFC 2445 / RFC 5545 duration string into milliseconds.
 * Supports forms such as `PT1H`, `P1D`, `P3W`, `P2DT4H30M`.
 *
 * @throws If the string is empty, negative, zero-length, or not a valid duration.
 */
function parseRfc2445DurationMs(value: string): number {
  const match = /^([+-])?P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i.exec(value);
  if (match == null) {
    throw new Error(`Invalid duration: ${value}`);
  }

  const sign = match[1] === '-' ? -1 : 1;
  const weeks = Number(match[2] ?? 0);
  const days = Number(match[3] ?? 0);
  const hours = Number(match[4] ?? 0);
  const minutes = Number(match[5] ?? 0);
  const seconds = Number(match[6] ?? 0);

  // Require at least one unit so bare "P" / "PT" are rejected.
  if (weeks === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    throw new Error(`Invalid duration: ${value}`);
  }

  const ms = weeks * 7 * DAY_MS + days * DAY_MS + hours * HOUR_MS + minutes * 60 * 1000 + seconds * 1000;
  const signed = sign * ms;
  if (signed <= 0) {
    throw new Error(`Invalid duration: ${value}`);
  }
  return signed;
}

function mapTransparency(availability: EventAvailability | undefined): 'OPAQUE' | 'TRANSPARENT' | null {
  if (availability == null) {
    return null;
  }
  if (availability === EventAvailability.FREE) {
    return 'TRANSPARENT';
  }
  if (availability === EventAvailability.BUSY) {
    return 'OPAQUE';
  }
  return 'OPAQUE';
}

function toRRule(rule: EventRecurrenceRule, isAllDay: boolean): string {
  const parts: string[] = [`FREQ=${rule.frequency.toUpperCase()}`, `INTERVAL=${Math.max(1, rule.interval ?? 1)}`];

  if (rule.count != null) {
    parts.push(`COUNT=${rule.count}`);
  } else if (rule.end != null) {
    // RFC 5545: UNTIL must match DTSTART value type (DATE vs DATE-TIME).
    parts.push(`UNTIL=${isAllDay ? formatDateOnlyLocal(rule.end) : formatDateTimeUtc(rule.end)}`);
  }

  if (rule.byWeekDay != null && rule.byWeekDay.length > 0) {
    const mapped = rule.byWeekDay.map(mapWeekday).filter((d): d is string => d != null);
    if (mapped.length > 0) {
      parts.push(`BYDAY=${[...new Set(mapped)].join(',')}`);
    }
  }

  if (rule.byMonthDay != null && rule.byMonthDay.length > 0) {
    parts.push(`BYMONTHDAY=${rule.byMonthDay.join(',')}`);
  }
  if (rule.byMonth != null && rule.byMonth.length > 0) {
    parts.push(`BYMONTH=${rule.byMonth.join(',')}`);
  }
  if (rule.weeksOfTheYear != null && rule.weeksOfTheYear.length > 0) {
    parts.push(`BYWEEKNO=${rule.weeksOfTheYear.join(',')}`);
  }
  if (rule.daysOfTheYear != null && rule.daysOfTheYear.length > 0) {
    parts.push(`BYYEARDAY=${rule.daysOfTheYear.join(',')}`);
  }

  return parts.join(';');
}

function mapWeekday(day: number): string | null {
  switch (day) {
    case 1:
      return 'MO';
    case 2:
      return 'TU';
    case 3:
      return 'WE';
    case 4:
      return 'TH';
    case 5:
      return 'FR';
    case 6:
      return 'SA';
    case 7:
      return 'SU';
    default:
      return null;
  }
}

function buildAlarm(minutes: number): string[] {
  const trigger = minutes < 0 ? `-PT${Math.abs(minutes)}M` : `PT${minutes}M`;
  return ['BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Reminder', `TRIGGER:${trigger}`, 'END:VALARM'];
}

function generateUid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${crypto.randomUUID()}@capacitor-calendar`;
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}@capacitor-calendar`;
}

function formatDateTimeUtc(ms: number): string {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const mo = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  const h = pad(d.getUTCHours());
  const mi = pad(d.getUTCMinutes());
  const s = pad(d.getUTCSeconds());
  return `${y}${mo}${day}T${h}${mi}${s}Z`;
}

function formatDateOnlyLocal(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/**
 * Escapes TEXT values per RFC 5545 §3.3.11.
 */
export function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\n|\r/g, '\\n');
}

/**
 * Formats a property parameter value per RFC 5545 §3.2.
 * Values with COMMA, SEMICOLON, or COLON are quoted; DQUOTE and line breaks are sanitized.
 */
function formatParamValue(value: string): string {
  const sanitized = value.replace(/[\r\n]+/g, ' ').replace(/"/g, "'");
  if (/[;:,]/.test(sanitized)) {
    return `"${sanitized}"`;
  }
  return sanitized;
}

/**
 * Folds a content line so each physical line is at most 75 octets (RFC 5545 §3.1).
 */
export function foldLine(line: string): string {
  const max = 75;
  if (byteLength(line) <= max) {
    return line;
  }

  const chars = [...line];
  let result = '';
  let current = '';

  for (const ch of chars) {
    const next = current + ch;
    if (byteLength(next) > max) {
      result += result.length === 0 ? current : `${CRLF} ${current}`;
      current = ch;
      // Continuations are limited to 74 octets of content + leading space = 75
      while (byteLength(current) > max - 1) {
        // Extremely rare for a single code point; split by taking first unit as-is
        result += `${CRLF} ${current}`;
        current = '';
        break;
      }
    } else {
      current = next;
    }
  }

  if (current.length > 0) {
    result += result.length === 0 ? current : `${CRLF} ${current}`;
  }

  return result;
}

function byteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}
