import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getEventInstanceDate, getEventSpan } from '../utils/dom.js';
import { getEventId } from '../utils/ids.js';

export function registerDeleteEvent() {
  document.querySelector('#delete-event').addEventListener('click', async () => {
    await CapacitorCalendar.deleteEvent({
      id: getEventId(),
      instanceDate: getEventInstanceDate(),
      span: getEventSpan(),
    });
  });
}
