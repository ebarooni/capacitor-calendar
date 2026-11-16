import type { PluginListenerHandle } from '@capacitor/core';

import type { CalendarChangedEvent } from '../schemas/interfaces/calendar-changed-event';
import type { StartListeningOptions } from '../schemas/interfaces/start-listening-options';

export interface CalendarListening {
  /**
   * Starts to watch the calendar for changes in a time window.
   * Call `addListener('calendarChanged', ...)` to receive them.
   * A new call replaces the previous window.
   * The plugin reads the window once as a baseline. It then compares the window after each change.
   * Changes made by this plugin also trigger the listener.
   * Changes made while the app is stopped are not sent.
   * Needs calendar read access.
   *
   * @example
   * const handle = await CapacitorCalendar.addListener('calendarChanged', (change) => {
   *   console.log(change.created, change.updated, change.deletedIds);
   * });
   * await CapacitorCalendar.startListening({ from: Date.now(), to: Date.now() + 30 * 24 * 60 * 60 * 1000 });
   *
   * @throws {Error} `From date must be provided.` — when `from` is missing.
   * @throws {Error} `To date must be provided.` — when `to` is missing.
   * @throws {Error} `Calendar not found.` — when a `calendarIds` entry does not match a calendar.
   *
   * @platform Android, iOS
   * @since 8.12.0
   */
  startListening(options: StartListeningOptions): Promise<void>;
  /**
   * Stops to watch the calendar. Does nothing when no watch is active.
   * Listeners stay registered. Remove them with their handle or `removeAllListeners`.
   *
   * @platform Android, iOS
   * @since 8.12.0
   */
  stopListening(): Promise<void>;
  /**
   * Adds a listener for calendar changes. Call `startListening` to start the events.
   *
   * @platform Android, iOS
   * @since 8.12.0
   */
  addListener(
    eventName: 'calendarChanged',
    listenerFunc: (event: CalendarChangedEvent) => void,
  ): Promise<PluginListenerHandle>;
  /**
   * Removes all listeners of this plugin.
   *
   * @since 8.12.0
   */
  removeAllListeners(): Promise<void>;
}
