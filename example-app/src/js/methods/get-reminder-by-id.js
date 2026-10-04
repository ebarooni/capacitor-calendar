import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getReminderIdInput } from '../utils/dom.js';

export function registerGetReminderById() {
  document.querySelector('#get-reminder-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getReminderById({
      id: getReminderIdInput().value,
    });
    console.log('#getReminderById', result);
  });
}
