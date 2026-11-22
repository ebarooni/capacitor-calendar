import { createIcsFile, shareIcsFile } from '@ebarooni/capacitor-calendar';
import { presentToast } from '../utils/toast.js';

export function registerShareIcsFile() {
  document.querySelector('#share-ics-file').addEventListener('click', async () => {
    // Build the file synchronously so the click still allows the share sheet
    const file = createIcsFile({
      startDate: Date.now() + 24 * 60 * 60 * 1000,
      title: 'Team standup',
      uid: 'example-app-team-standup',
    });
    const result = await shareIcsFile(file, { title: 'Team standup' });
    console.log('#shareIcsFile', result);
    await presentToast(`shareIcsFile: ${result}`);
  });
}
