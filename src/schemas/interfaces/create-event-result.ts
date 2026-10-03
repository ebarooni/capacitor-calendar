/**
 * @since 8.5.0
 */
export interface CreateEventResult {
  /**
   * An `.ics` file (`text/calendar`) with one `VEVENT`.
   * Always `null` on Android and iOS.
   * On Web, always returned when an event ICS is built; set `downloadIcs` or call `downloadIcsFile(...)` to download.
   *
   * @platform Web
   * @since 8.5.0
   */
  ics: File | null;
  /**
   * The identifier of the created event.
   * Always `null` on Web.
   * Present on Android and iOS after a successful create.
   *
   * @platform Android, iOS
   * @since 0.4.0
   */
  id: string | null;
}
