import type { Calendar } from './calendar';

/**
 * A reminders list on iOS.
 *
 * Same shape as {@link Calendar} today. Android-only calendar fields
 * (`visible`, `accountName`, `ownerAccount`, `maxReminders`, `internalTitle`,
 * `location`) are always `null` on reminder list payloads. `color` is hex on
 * read-back even when create or update used a named color.
 *
 * @since 7.1.0
 */
export type RemindersList = Calendar;
