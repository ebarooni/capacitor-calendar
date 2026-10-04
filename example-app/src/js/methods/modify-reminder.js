import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getInputValue, getReminderIdInput } from '../utils/dom.js';

export function registerModifyReminder() {
  document.querySelector('#modify-reminder').addEventListener('click', async () => {
    const recurrenceEnd = Date.now() + 7 * 24 * 60 * 60 * 1000;

    await CapacitorCalendar.modifyReminder({
      id: getReminderIdInput().value,
      notes: 'Updated with @ebarooni/capacitor-calendar',
      recurrence: {
        end: recurrenceEnd,
        frequency: 'daily',
        interval: 2,
      },
      title: getInputValue('#modify-reminder-title-input', 'Updated weekly grocery check'),
    });
    console.log('#modifyReminder');
  });
}
