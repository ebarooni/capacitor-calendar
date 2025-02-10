import type { CreateEventWithPromptOptions } from "./create-event-with-prompt-options";

/**
 * @since 7.1.0
 */
export interface CreateEventOptions extends CreateEventWithPromptOptions {
  /**
   * @platform Android, iOS
   * @since 0.4.0
   */
  title: string;
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  alerts?: number[];
  /**
   * Email of the event organizer.
   *
   * @platform Android
   * @since 7.1.0
   */
  organizer?: string;
  /**
   * @example #6750A4
   * @platform Android
   * @since 7.1.0
   */
  color?: string;
  /**
   * Duration of the event in RFC2445 format.
   *
   * @example P1D (1 day), P3W (3 weeks), P2DT4H30M (2 days, 4 hours, and 30 minutes).
   * @platform Android
   * @see {@link https://datatracker.ietf.org/doc/html/rfc2445}
   * @since 7.1.0
   */
  duration?: string;
  /**
   * Whether to save immediately (`true`) or batch changes for later (`false`).
   *
   * @default true
   * @platform iOS
   * @see {@link CalendarOperations#commit}
   * @since 7.1.0
   */
  commit?: boolean;
}
