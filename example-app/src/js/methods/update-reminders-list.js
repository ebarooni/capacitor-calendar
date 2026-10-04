import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { optionalColorFromSelect } from '../utils/color.js';
import { getInputValue } from '../utils/dom.js';
import { getRemindersListId, setRemindersListId } from '../utils/ids.js';

export function registerUpdateRemindersList() {
  document.querySelector('#update-reminders-list').addEventListener('click', async () => {
    const result = await CapacitorCalendar.updateRemindersList({
      ...optionalColorFromSelect('#update-reminders-list-color-select'),
      id: getRemindersListId(),
      title: getInputValue('#update-reminders-list-title-input', 'Updated Groceries list'),
    });

    setRemindersListId(result.id);
    console.log('#updateRemindersList', result);
  });
}
