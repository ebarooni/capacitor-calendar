/**
 * @since 7.1.0
 */
export enum AttendeeStatus {
  /**
   * @platform Android
   * @since 7.1.0
   */
  NONE = 'none',
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  ACCEPTED = 'accepted',
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  DECLINED = 'declined',
  /**
   * @platform Android
   * @since 7.1.0
   */
  INVITED = 'invited',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  UNKNOWN = 'unknown',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  PENDING = 'pending',
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  TENTATIVE = 'tentative',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  DELEGATED = 'delegated',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  COMPLETED = 'completed',
  /**
   * @platform iOS
   * @since 7.1.0
   */
  IN_PROCESS = 'inProcess',
}
