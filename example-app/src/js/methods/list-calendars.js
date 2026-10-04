import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { calendarToSelectItem, setIdFieldOptions } from '../utils/ids.js';

export function registerListCalendars() {
  document.querySelector('#list-calendars').addEventListener('click', async () => {
    const result = await CapacitorCalendar.listCalendars();
    setIdFieldOptions('calendar', result.result.map(calendarToSelectItem));
    console.log('#listCalendars', result);
  });
}
