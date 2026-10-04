import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getReminderIdInput, getRemindersListIdInput } from '../utils/dom.js';

export function registerGetRemindersFromLists() {
  document.querySelector('#get-reminders-from-lists').addEventListener('click', async () => {
    let listIds = [getRemindersListIdInput().value.trim()].filter(Boolean);
    if (listIds.length === 0) {
      const { result: lists } = await CapacitorCalendar.getRemindersLists();
      listIds = lists.map((list) => list.id).filter(Boolean);
    }

    const result = await CapacitorCalendar.getRemindersFromLists({ listIds });
    const reminder = result.result[0];
    if (reminder?.id) {
      getReminderIdInput().value = reminder.id;
    }
    console.log('#getRemindersFromLists', result);
  });
}
