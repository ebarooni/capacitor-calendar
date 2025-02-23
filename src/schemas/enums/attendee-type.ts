/**
 * @since 7.1.0
 */
export enum AttendeeType {
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  UNKNOWN = "unknown",
  /**
   * @platform iOS
   * @since 7.1.0
   */
  PERSON = "person",
  /**
   * @platform iOS
   * @since 7.1.0
   */
  ROOM = "room",
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  RESOURCE = "resource",
  /**
   * @platform iOS
   * @since 7.1.0
   */
  GROUP = "group",
  /**
   * @platform Android
   * @since 7.1.0
   */
  REQUIRED = "required",
  /**
   * @platform Android
   * @since 7.1.0
   */
  NONE = "none",
  /**
   * @platform Android
   * @since 7.1.0
   */
  OPTIONAL = "optional",
}
