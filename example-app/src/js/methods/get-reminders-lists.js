import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { remindersListToSelectItem, setIdFieldOptions } from '../utils/ids.js';

export function registerGetRemindersLists() {
  document.querySelector('#get-reminders-lists').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getRemindersLists();
    setIdFieldOptions('remindersList', result.result.map(remindersListToSelectItem));
    console.log('#getRemindersLists', result);
  });
}
