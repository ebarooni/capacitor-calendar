import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { calendarToSelectItem, populateResultSelect } from '../utils/result-selects.js';

export function registerListCalendars() {
  document.querySelector('#list-calendars').addEventListener('click', async () => {
    const result = await CapacitorCalendar.listCalendars();
    populateResultSelect('#calendar-results-select', result.result.map(calendarToSelectItem));
    console.log('#listCalendars', result);
  });
}
