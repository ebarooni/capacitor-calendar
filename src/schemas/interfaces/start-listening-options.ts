/**
 * @since 8.12.0
 */
export interface StartListeningOptions {
  /**
   * The start of the window to watch, in milliseconds since the epoch.
   * Events still in progress at this time are watched.
   *
   * @example 1719792000000
   * @since 8.12.0
   */
  from: number;
  /**
   * The end of the window to watch, in milliseconds since the epoch.
   * Use a window of a few months. A large window makes each check slower.
   *
   * @example 1722470400000
   * @since 8.12.0
   */
  to: number;
  /**
   * Ids of the calendars whose events are watched. When omitted or empty, all calendars are watched.
   * Rejects if an id does not match a calendar.
   *
   * @example ["1", "2"]
   * @since 8.12.0
   */
  calendarIds?: string[];
  /**
   * Whether `created` and `updated` hold the full events. Defaults to `true`.
   * When `false`, those fields are omitted. `precise` is then `false` when events were created or updated.
   *
   * @default true
   * @since 8.12.0
   */
  includeEvents?: boolean;
  /**
   * Whether to report reminder changes with `remindersChanged`. Defaults to `false`.
   * Needs reminders access. No reminders are sent, only a signal.
   *
   * @default false
   * @platform iOS
   * @since 8.12.0
   */
  includeReminders?: boolean;
}
