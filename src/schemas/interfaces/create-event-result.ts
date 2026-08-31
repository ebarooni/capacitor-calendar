/**
 * @since 8.5.0
 */
export interface CreateEventResult {
  /**
   * An `.ics` file (`text/calendar`) with one `VEVENT`.
   * Present only on Web. The plugin does not write to a calendar store or start a download;
   * use `downloadIcsFile(...)` or pass the `File` to another API.
   *
   * @platform Web
   * @since 8.5.0
   */
  ics?: File;
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
