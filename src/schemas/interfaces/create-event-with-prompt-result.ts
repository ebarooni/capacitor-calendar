/**
 * @since 8.5.0
 */
export interface CreateEventWithPromptResult {
  /**
   * An `.ics` file (`text/calendar`) with one `VEVENT`.
   * Always `null` on Android and iOS.
   * On Web, set when the user confirms; `null` when the user cancels.
   *
   * @platform Web
   * @since 8.8.0
   */
  ics: File | null;
  /**
   * The identifier of the created event.
   * Always `null` on Android and Web.
   * Present on iOS when the user saves.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  id: string | null;
}
