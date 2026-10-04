import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerGetRemindersLists() {
  document.querySelector('#get-reminders-lists').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getRemindersLists();
    console.log('#getRemindersLists', result);
  });
}
