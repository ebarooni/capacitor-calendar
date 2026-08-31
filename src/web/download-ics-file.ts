/**
 * Triggers a browser download for an `.ics` `File`.
 * Resolves after the object URL is revoked.
 *
 * @throws If `document` or `URL` is not available.
 *
 * @example
 * const { ics } = await CapacitorCalendar.createEvent({
 *   title: 'Team standup',
 *   icsFileName: 'team-standup.ics',
 * });
 * if (ics) {
 *   await downloadIcsFile(ics);
 * }
 *
 * @since 8.5.0
 */
export async function downloadIcsFile(file: File): Promise<void> {
  if (typeof document === 'undefined' || typeof URL === 'undefined') {
    throw new Error('downloadIcsFile requires a browser document environment.');
  }

  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name.length > 0 ? file.name : 'event.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Delay revoke so the browser can start the download
  await new Promise((resolve) => setTimeout(resolve, 1000));
  URL.revokeObjectURL(url);
}
