import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerListCalendars() {
  document.querySelector('#list-calendars').addEventListener('click', async () => {
    const result = await CapacitorCalendar.listCalendars();
    console.log('#listCalendars', result);
  });
}
