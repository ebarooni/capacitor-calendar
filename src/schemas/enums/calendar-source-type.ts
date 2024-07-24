/**
 * Represents the different types of sources from which calendars can originate.
 *
 * @enum CalendarSourceType
 * @platform iOS
 */
export enum CalendarSourceType {
  /**
   * Calendars that are stored locally on the device. These calendars are not
   * synced with any external service.
   */
  LOCAL,

  /**
   * Calendars that are associated with an Exchange server. Exchange is a
   * popular calendar and email service used by many enterprises.
   */
  EXCHANGE,

  /**
   * Calendars that use the CalDAV protocol for synchronization.
   * This includes calendars from services like Google Calendar and Yahoo Calendar.
   */
  CAL_DAV,

  /**
   * Calendars that were previously associated with MobileMe, Apple's cloud
   * service before iCloud. This source type is largely obsolete now.
   */
  MOBILE_ME,

  /**
   * Calendars that the user has subscribed to. These are read-only calendars
   * that can be added by subscribing to a calendar URL.
   */
  SUBSCRIBED,

  /**
   * The built-in Birthdays calendar, which shows birthdays of contacts from the user's address book.
   * This calendar is typically read-only and is managed by the system.
   */
  BIRTHDAYS,
}
