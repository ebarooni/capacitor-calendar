import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { eventToSelectItem, populateResultSelect } from '../utils/result-selects.js';

export function registerListEventsInRange() {
  document.querySelector('#list-events-in-range').addEventListener('click', async () => {
    const from = new Date();
    const to = new Date();
    to.setMonth(from.getMonth() + 1);

    const result = await CapacitorCalendar.listEventsInRange({
      from: from.getTime(),
      to: to.getTime(),
    });
    populateResultSelect('#event-results-select', result.result.map(eventToSelectItem));
    console.log('#listEventsInRange', result);
  });
}
