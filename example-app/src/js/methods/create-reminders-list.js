import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { optionalColorFromSelect } from '../utils/color.js';
import { getInputValue, injectMethodOptions } from '../utils/dom.js';
import { setRemindersListId } from '../utils/ids.js';
import optionsHtml from './create-reminders-list.options.html?raw';

export function registerCreateRemindersList() {
  injectMethodOptions(optionsHtml);
  document.querySelector('#create-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createRemindersList({
      ...optionalColorFromSelect('#create-reminders-list-color-select'),
      title: getInputValue('#create-reminders-list-title-input', 'Groceries list'),
    });

    setRemindersListId(result.id);
    console.log('#createRemindersList', result);
  });
}
