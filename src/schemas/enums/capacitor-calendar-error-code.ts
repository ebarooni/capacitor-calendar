/**
 * Stable reject codes for CapacitorCalendar. Compare with `error.code`.
 *
 * @since 8.9.0
 */
export enum CapacitorCalendarErrorCode {
  /**
   * Missing or invalid method arguments.
   *
   * @since 8.10.0
   */
  InvalidArgument = 'EB-CLDR-0001',

  /**
   * Requested calendar, event, list, reminder, or calendar source was not found.
   *
   * @since 8.10.0
   */
  NotFound = 'EB-CLDR-0002',

  /**
   * The device cannot open the calendar UI, reminders UI, or target URL.
   *
   * @since 8.11.0
   */
  NotSupported = 'EB-CLDR-0005',

  /**
   * Calendar or reminders access was denied.
   *
   * @since 8.11.0
   */
  PermissionDenied = 'EB-CLDR-0020',

  /**
   * Missing Info.plist usage description or AndroidManifest permission declaration.
   *
   * @since 8.9.0
   */
  MissingDeclaration = 'EB-CLDR-0100',
}
