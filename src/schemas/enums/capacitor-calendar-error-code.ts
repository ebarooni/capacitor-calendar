/**
 * Stable reject codes for CapacitorCalendar. Compare with `error.code`.
 *
 * @since 7.4.0
 */
export enum CapacitorCalendarErrorCode {
  /**
   * Missing or invalid method arguments.
   *
   * @since 7.5.0
   */
  InvalidArgument = 'EB-CLDR-0001',

  /**
   * Requested calendar, event, list, reminder, or calendar source was not found.
   *
   * @since 7.5.0
   */
  NotFound = 'EB-CLDR-0002',

  /**
   * A calendar store read or write failed.
   *
   * @since 7.5.0
   */
  IoError = 'EB-CLDR-0004',

  /**
   * The device cannot open the calendar UI, reminders UI, or target URL.
   *
   * @since 7.5.0
   */
  NotSupported = 'EB-CLDR-0005',

  /**
   * Calendar access was denied.
   * On Android, calendar operations that fail with a permission error reject with this code. Permission check and request APIs still resolve `"denied"` on Android and iOS.
   *
   * @since 7.5.0
   */
  PermissionDenied = 'EB-CLDR-0020',

  /**
   * Missing Info.plist usage description or AndroidManifest permission declaration.
   *
   * @since 7.4.0
   */
  MissingDeclaration = 'EB-CLDR-0100',
}
