export interface ICreateEventAction {
  action: 'saved' | 'canceled' | 'error'
}

export interface CapacitorCalendarPlugin {
  /**
   * Creates an event in the calendar by displaying a prompt.
   *
   * @method
   * @returns { Promise } – The action of the user. It can be saved, canceled or error.
   */
  createEventWithPrompt(): Promise<ICreateEventAction>;
}
