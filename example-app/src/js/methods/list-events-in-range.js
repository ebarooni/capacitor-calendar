import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getEventIdInput, getEventInstanceDateInput } from '../utils/dom.js';

export function registerListEventsInRange() {
  document.querySelector('#list-events-in-range').addEventListener('click', async () => {
    const from = new Date();
    const to = new Date();
    to.setMonth(from.getMonth() + 1);

    const result = await CapacitorCalendar.listEventsInRange({
      from: from.getTime(),
      to: to.getTime(),
    });
    console.log('#listEventsInRange', result);

    const event = result.result[0];
    if (event) {
      getEventIdInput().value = event.id;
      getEventInstanceDateInput().value = String(event.startDate);
    }
  });
}
