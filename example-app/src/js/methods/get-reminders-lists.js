import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { populateResultSelect, remindersListToSelectItem } from '../utils/result-selects.js';

export function registerGetRemindersLists() {
  document.querySelector('#get-reminders-lists').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getRemindersLists();
    populateResultSelect('#reminders-list-results-select', result.result.map(remindersListToSelectItem));
    console.log('#getRemindersLists', result);
  });
}
