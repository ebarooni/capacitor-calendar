import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { eventToSelectItem, setIdFieldOptions } from '../utils/ids.js';

export function registerListEventsInRange() {
  document.querySelector('#list-events-in-range').addEventListener('click', async () => {
    const from = new Date();
    const to = new Date();
    to.setMonth(from.getMonth() + 1);

    const result = await CapacitorCalendar.listEventsInRange({
      from: from.getTime(),
      to: to.getTime(),
    });
    setIdFieldOptions('event', result.result.map(eventToSelectItem));
    console.log('#listEventsInRange', result);
  });
}
