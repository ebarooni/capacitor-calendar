import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getEventSpan } from '../utils/dom.js';
import { getEventId } from '../utils/ids.js';

export function registerDeleteEventsById() {
  document.querySelector('#delete-events-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.deleteEventsById({
      ids: [getEventId()],
      span: getEventSpan(),
    });
    console.log('#deleteEventsById', result);
  });
}
