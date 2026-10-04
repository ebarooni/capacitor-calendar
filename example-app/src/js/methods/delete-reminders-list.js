import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getRemindersListId } from '../utils/ids.js';

export function registerDeleteRemindersList() {
  document.querySelector('#delete-reminders-list').addEventListener('click', async () => {
    const id = getRemindersListId();
    await CapacitorCalendar.deleteRemindersList({ id });
  });
}
