import type { Calendar } from './calendar';

/**
 * A reminders list on iOS.
 *
 * Same shape as {@link Calendar} today. Android-only calendar fields
 * (`visible`, `accountName`, `ownerAccount`, `maxReminders`, `internalTitle`,
 * `location`) are always `null` on reminder list payloads.
 *
 * @since 7.1.0
 */
export type RemindersList = Calendar;
