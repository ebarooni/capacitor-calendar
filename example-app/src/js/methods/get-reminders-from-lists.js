import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getRemindersListIdInput } from '../utils/dom.js';
import { populateResultSelect, reminderToSelectItem } from '../utils/result-selects.js';

export function registerGetRemindersFromLists() {
  document.querySelector('#get-reminders-from-lists').addEventListener('click', async () => {
    let listIds = [getRemindersListIdInput().value.trim()].filter(Boolean);
    if (listIds.length === 0) {
      const { result: lists } = await CapacitorCalendar.getRemindersLists();
      listIds = lists.map((list) => list.id).filter(Boolean);
    }

    const result = await CapacitorCalendar.getRemindersFromLists({ listIds });
    populateResultSelect('#reminder-results-select', result.result.map(reminderToSelectItem));
    console.log('#getRemindersFromLists', result);
  });
}
