import type { ShareIcsFileOptions } from '../schemas/interfaces/share-ics-file-options';

import { downloadIcsFile } from './download-ics-file';

/**
 * Opens the share sheet of the device for an `.ics` `File`.
 * When the browser cannot share files, the file downloads instead.
 * Call it from a user action, such as a click. Browsers reject the share sheet otherwise.
 * Build the file synchronously (for example with `createIcsFile`) so the click still counts when the sheet opens.
 * Some browsers, such as Chrome, do not share `.ics` files and download them instead.
 *
 * Resolves `'shared'` after the user picks a target, `'cancelled'` when the user closes the sheet,
 * and `'downloaded'` when the browser fell back to a download.
 *
 * @example
 * button.addEventListener('click', async () => {
 *   const file = createIcsFile({ title: 'Team standup', startDate: Date.now() });
 *   await shareIcsFile(file, { title: 'Team standup' });
 * });
 *
 * @since 8.12.0
 */
export async function shareIcsFile(
  file: File,
  options: ShareIcsFileOptions = {},
): Promise<'shared' | 'cancelled' | 'downloaded'> {
  const shareData: ShareData = { files: [file], title: options.title, text: options.text };

  if (
    typeof navigator === 'undefined' ||
    typeof navigator.share !== 'function' ||
    typeof navigator.canShare !== 'function' ||
    !navigator.canShare(shareData)
  ) {
    await downloadIcsFile(file);
    return 'downloaded';
  }

  try {
    await navigator.share(shareData);
    return 'shared';
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'cancelled';
    }
    throw error;
  }
}
