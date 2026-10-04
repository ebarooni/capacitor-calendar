import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getEventIdInput, getEventSpan } from '../utils/dom.js';

export function registerDeleteEventsById() {
  document.querySelector('#delete-events-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.deleteEventsById({
      ids: [getEventIdInput().value],
      span: getEventSpan(),
    });
    console.log('#deleteEventsById', result);
  });
}
