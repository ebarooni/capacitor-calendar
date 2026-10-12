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
   * Missing Info.plist usage description or AndroidManifest permission declaration.
   *
   * @since 7.4.0
   */
  MissingDeclaration = 'EB-CLDR-0100',
}
