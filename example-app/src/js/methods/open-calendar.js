import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

export function registerOpenCalendar() {
  document.querySelector('#open-calendar').addEventListener('click', async () => {
    await CapacitorCalendar.openCalendar({ date: Date.now() });
    console.log('#openCalendar');
  });
}
