import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';

let listenerHandle = null;

export function registerStartListening() {
  document.querySelector('#start-listening').addEventListener('click', async () => {
    if (listenerHandle == null) {
      listenerHandle = await CapacitorCalendar.addListener('calendarChanged', (change) => {
        console.log('#calendarChanged', change);
      });
    }
    const from = new Date();
    const to = new Date();
    to.setMonth(from.getMonth() + 1);

    await CapacitorCalendar.startListening({
      from: from.getTime(),
      to: to.getTime(),
      includeReminders: true,
    });
    console.log('#startListening');
  });
}
