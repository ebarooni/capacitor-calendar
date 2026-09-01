/**
 * @since 8.5.0
 */
export interface CreateEventWithPromptResult {
  /**
   * The identifier of the created event.
   * Always `null` on Android.
   * Present on iOS when the user saves.
   *
   * @platform Android, iOS
   * @since 0.1.0
   */
  id: string | null;
}
