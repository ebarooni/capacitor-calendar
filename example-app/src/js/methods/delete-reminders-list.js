import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getRemindersListIdInput } from '../utils/dom.js';

export function registerDeleteRemindersList() {
  document.querySelector('#delete-reminders-list').addEventListener('click', async () => {
    const id = getRemindersListIdInput().value;
    await CapacitorCalendar.deleteRemindersList({ id });
  });
}
