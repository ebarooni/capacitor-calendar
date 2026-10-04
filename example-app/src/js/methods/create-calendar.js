import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { optionalColorFromSelect } from '../utils/color.js';
import { getCalendarIdInput, getInputValue } from '../utils/dom.js';

export function registerCreateCalendar() {
  document.querySelector('#create-calendar').addEventListener('click', async () => {
    const result = await CapacitorCalendar.createCalendar({
      accountName: 'plugin@example.com',
      ...optionalColorFromSelect('#create-calendar-color-select'),
      ownerAccount: 'plugin@example.com',
      title: getInputValue('#create-calendar-title-input', 'Plugin Test Calendar'),
    });

    getCalendarIdInput().value = result.id;
    console.log('#createCalendar', result);
  });
}
