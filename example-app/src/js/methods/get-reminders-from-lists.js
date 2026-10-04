import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getRemindersListId, reminderToSelectItem, setIdFieldOptions } from '../utils/ids.js';

export function registerGetRemindersFromLists() {
  document.querySelector('#get-reminders-from-lists').addEventListener('click', async () => {
    let listIds = [getRemindersListId()].filter(Boolean);
    if (listIds.length === 0) {
      const { result: lists } = await CapacitorCalendar.getRemindersLists();
      listIds = lists.map((list) => list.id).filter(Boolean);
    }

    const result = await CapacitorCalendar.getRemindersFromLists({ listIds });
    setIdFieldOptions('reminder', result.result.map(reminderToSelectItem));
    console.log('#getRemindersFromLists', result);
  });
}
