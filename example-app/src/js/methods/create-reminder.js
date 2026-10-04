import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { getInputValue, getRemindersListIdInput } from '../utils/dom.js';
import { setReminderId } from '../utils/ids.js';

export function registerCreateReminder() {
  document.querySelector('#create-reminder').addEventListener('click', async () => {
    const startDate = Date.now();
    const dueDate = startDate + 60 * 60 * 1000;
    const recurrenceEnd = startDate + 14 * 24 * 60 * 60 * 1000;
    const listId = getRemindersListIdInput().value.trim();

    const result = await CapacitorCalendar.createReminder({
      alerts: [-60],
      dueDate,
      ...(listId ? { listId } : {}),
      notes: 'Created with @ebarooni/capacitor-calendar',
      recurrence: {
        end: recurrenceEnd,
        frequency: 'weekly',
        interval: 1,
      },
      startDate,
      title: getInputValue('#create-reminder-title-input', 'Weekly grocery check'),
    });

    setReminderId(result.id);
    console.log('#createReminder', result);
  });
}
