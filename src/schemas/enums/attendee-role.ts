/**
 * @since 7.1.0
 */
export enum AttendeeRole {
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  UNKNOWN = 'unknown',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  REQUIRED = 'required',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  OPTIONAL = 'optional',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  CHAIR = 'chair',
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  NON_PARTICIPANT = 'nonParticipant',
  /**
   * @platform Android
   * @since 7.1.0
   */
  ATTENDEE = 'attendee',
  /**
   * @platform Android
   * @since 7.1.0
   */
  ORGANIZER = 'organizer',
  /**
   * @platform Android
   * @since 7.1.0
   */
  PERFORMER = 'performer',
  /**
   * @platform Android
   * @since 7.1.0
   */
  SPEAKER = 'speaker',
}
