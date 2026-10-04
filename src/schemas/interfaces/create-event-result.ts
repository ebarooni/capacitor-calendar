/**
 * @since 7.3.0
 */
export interface CreateEventResult {
  /**
   * An `.ics` file (`text/calendar`) with one `VEVENT`.
   * Always `null` on Android and iOS.
   *
   * @platform Web
   * @since 7.3.0
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
