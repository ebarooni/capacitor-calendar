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
   * Requested calendar, event, list, or reminder was not found.
   *
   * @since 8.10.0
   */
  NotFound = 'EB-CLDR-0002',

  /**
   * Missing Info.plist usage description or AndroidManifest permission declaration.
   *
   * @since 8.9.0
   */
  MissingDeclaration = 'EB-CLDR-0100',
}
