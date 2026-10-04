import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getReminderIdInput } from '../utils/dom.js';
import { setReminderId, setRemindersListId } from '../utils/ids.js';
import { populateResultSelect, reminderToSelectItem } from '../utils/result-selects.js';

export function registerGetReminderById() {
  document.querySelector('#get-reminder-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getReminderById({
      id: getReminderIdInput().value,
    });
    if (result.result?.id) {
      setReminderId(result.result.id);
      if (result.result.listId) {
        setRemindersListId(result.result.listId);
      }
      populateResultSelect('#reminder-results-select', [reminderToSelectItem(result.result)]);
    }
    console.log('#getReminderById', result);
  });
}
