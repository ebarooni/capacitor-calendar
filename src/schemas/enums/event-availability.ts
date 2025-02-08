/**
 * @since 7.1.0
 */
export enum EventAvailability {
  /**
   * @platform iOS
   * @since 7.1.0
   */
  NOT_SUPPORTED = -1,
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  BUSY,
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  FREE,
  /**
   * @platform Android, iOS
   * @since 7.1.0
   */
  TENTATIVE,
  /**
   * @platform iOS
   * @since 7.1.0
   */
  UNAVAILABLE,
}
