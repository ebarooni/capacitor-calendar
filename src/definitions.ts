export interface CapacitorCalendarPlugin {
  /**
   * Creates an event in the calendar by displaying a prompt.
   *
   * @method
   * @returns { action: string } – The action of the user. It can be saved, canceled or error.
   */
  createEventWithPrompt(): Promise<{ action: string }>;
}
