import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getEventIdInput, getEventInstanceDate, getEventSpan } from '../utils/dom.js';

export function registerDeleteEventWithPrompt() {
  document.querySelector('#delete-event-with-prompt').addEventListener('click', async () => {
    const result = await CapacitorCalendar.deleteEventWithPrompt({
      id: getEventIdInput().value,
      instanceDate: getEventInstanceDate(),
      message: 'Are you sure you want to delete this event?',
      span: getEventSpan(),
      title: 'Delete event',
    });
    console.log('#deleteEventWithPrompt', result);
  });
}
