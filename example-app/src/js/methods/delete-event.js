import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getEventIdInput, getEventInstanceDate, getEventSpan } from '../utils/dom.js';

export function registerDeleteEvent() {
  document.querySelector('#delete-event').addEventListener('click', async () => {
    await CapacitorCalendar.deleteEvent({
      id: getEventIdInput().value,
      instanceDate: getEventInstanceDate(),
      span: getEventSpan(),
    });
  });
}
