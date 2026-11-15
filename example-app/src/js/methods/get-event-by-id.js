import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { eventToSelectItem, getEventId, setIdFieldOptions } from '../utils/ids.js';

export function registerGetEventById() {
  document.querySelector('#get-event-by-id').addEventListener('click', async () => {
    const result = await CapacitorCalendar.getEventById({
      id: getEventId(),
    });
    if (result.event?.id) {
      setIdFieldOptions('event', [eventToSelectItem(result.event)]);
    }
    console.log('#getEventById', result);
  });
}
