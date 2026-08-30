/**
 * Triggers a browser download for an `.ics` `File` (typically from web `createEvent`).
 * No-op outside a browser document environment.
 *
 * @example
 * const { ics } = await CapacitorCalendar.createEvent({
 *   title: 'Team standup',
 *   icsFileName: 'team-standup.ics',
 * });
 * if (ics) {
 *   downloadIcsFile(ics);
 * }
 *
 * @since 8.5.0
 */
export function downloadIcsFile(file: File): void {
  if (typeof document === 'undefined' || typeof URL === 'undefined') {
    return;
  }

  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name.length > 0 ? file.name : 'event.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Delay revoke so the browser can start the download
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
