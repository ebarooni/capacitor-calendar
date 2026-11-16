import type { CreateEventOptions } from '../schemas/interfaces/create-event-options';
import type { CreateIcsFileOptions } from '../schemas/interfaces/create-ics-file-options';

import { buildCalendarIcs, resolveIcsFileName } from './ics';

/**
 * Builds an `.ics` `File` with one `VEVENT` for each event.
 * Use it to export many events in one file, or to cancel events you exported before.
 *
 * @throws If `events` is empty.
 *
 * @example
 * const file = createIcsFile([
 *   { title: 'Kickoff', startDate: Date.now(), uid: 'kickoff-1' },
 *   { title: 'Review', startDate: Date.now() + 86400000, uid: 'review-1' },
 * ], { fileName: 'project.ics' });
 *
 * @example
 * // Ask calendar apps to remove an event that was imported before
 * const file = createIcsFile({ title: 'Kickoff', uid: 'kickoff-1', sequence: 1 }, { method: 'CANCEL' });
 *
 * @since 8.12.0
 */
export function createIcsFile(
  events: CreateEventOptions | CreateEventOptions[],
  options: CreateIcsFileOptions = {},
): File {
  const list = Array.isArray(events) ? events : [events];
  if (list.length === 0) {
    throw new Error('createIcsFile requires at least one event.');
  }
  const content = buildCalendarIcs(list, options.method ?? 'PUBLISH');
  const name = resolveIcsFileName({ icsFileName: options.fileName ?? list[0].icsFileName, title: list[0].title });
  return new File([content], name, { type: 'text/calendar;charset=utf-8' });
}
