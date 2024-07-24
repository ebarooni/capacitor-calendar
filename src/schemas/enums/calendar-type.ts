/**
 * An enum representing the type of calendar.
 *
 * @enum CalendarType
 * @platform iOS
 */
export enum CalendarType {
  /**
   *  This calendar is sync'd from either Mobile Me or tethered.
   */
  LOCAL,

  /**
   * This calendar is from a CalDAV server.
   */
  CAL_DAV,

  /**
   * This calendar comes from an Exchange server.
   */
  EXCHANGE,

  /**
   * This is a locally subscribed calendar.
   */
  SUBSCRIPTION,

  /**
   * This is the built-in birthday calendar.
   */
  BIRTHDAY,
}
