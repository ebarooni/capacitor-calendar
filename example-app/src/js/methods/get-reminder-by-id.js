import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getReminderId, reminderToSelectItem, setIdFieldOptions, setRemindersListId } from '../utils/ids.js';

export function registerGetReminderById() {
  document.querySelector('#get-reminder-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getReminderById({
      id: getReminderId(),
    });
    if (result.result?.id) {
      setIdFieldOptions('reminder', [reminderToSelectItem(result.result)]);
      if (result.result.listId) {
        setRemindersListId(result.result.listId);
      }
    }
    console.log('#getReminderById', result);
  });
}
