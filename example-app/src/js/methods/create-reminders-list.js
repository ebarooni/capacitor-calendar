import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { optionalColorFromSelect } from '../utils/color.js';
import { getInputValue, getRemindersListIdInput } from '../utils/dom.js';

export function registerCreateRemindersList() {
  document.querySelector('#create-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createRemindersList({
      ...optionalColorFromSelect('#create-reminders-list-color-select'),
      title: getInputValue('#create-reminders-list-title-input', 'Groceries list'),
    });

    getRemindersListIdInput().value = result.id;
    console.log('#createRemindersList', result);
  });
}
