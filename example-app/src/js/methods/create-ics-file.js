import { createIcsFile, downloadIcsFile } from '@ebarooni/capacitor-calendar';
import { injectMethodOptions } from '../utils/dom.js';
import { presentToast } from '../utils/toast.js';
import optionsHtml from './create-ics-file.options.html?raw';

const DAY_MS = 24 * 60 * 60 * 1000;

export function registerCreateIcsFile() {
  injectMethodOptions(optionsHtml);
  document.querySelector('#create-ics-file').addEventListener('click', async () => {
    const method = document.querySelector('#create-ics-file-method-select').value === 'CANCEL' ? 'CANCEL' : 'PUBLISH';
    const startDate = Date.now() + DAY_MS;
    // Stable uids, so a CANCEL file removes the events from an earlier PUBLISH file
    const events = [
      { title: 'Project kickoff', startDate, uid: 'example-app-kickoff', location: 'Room 1' },
      { title: 'Project review', startDate: startDate + 7 * DAY_MS, uid: 'example-app-review', isAllDay: true },
    ];
    const file = createIcsFile(events, { fileName: 'example-project', method });
    await downloadIcsFile(file);
    console.log('#createIcsFile', method, await file.text());
    await presentToast(`Downloaded ${file.name} (${method}).`);
  });
}
