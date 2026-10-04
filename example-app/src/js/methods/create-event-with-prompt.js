import { CapacitorCalendar, EventAvailability } from '@ebarooni/capacitor-calendar';
import { pickNonHolidayCalendar } from '../utils/calendars.js';
import { getEventIdInput, getInputValue } from '../utils/dom.js';
import { isWebPlatform } from '../utils/platform.js';
import { presentToast } from '../utils/toast.js';

export function registerCreateEventWithPrompt() {
  document.querySelector('#create-event-with-prompt').addEventListener('click', async () => {
    const isWeb = isWebPlatform();
    const startDate = Date.now() + 24 * 60 * 60 * 1000;
    const endDate = startDate + 60 * 60 * 1000;
    const promptOptions = {
      alerts: [-1440, -60, 30],
      availability: EventAvailability.BUSY,
      description: 'Created with @ebarooni/capacitor-calendar',
      endDate,
      invitees: ['guest@example.com', 'teammate@example.com'],
      isAllDay: false,
      location: 'Office',
      recurrence: {
        count: 4,
        frequency: 'weekly',
        interval: 1,
      },
      startDate,
      title: getInputValue('#create-event-with-prompt-title-input', 'Planning session'),
      url: 'https://example.com/planning',
    };

    // listCalendars is not implemented on web; calendarId is ignored there anyway
    if (!isWeb) {
      const { result: calendars } = await CapacitorCalendar.listCalendars();
      promptOptions.calendarId = pickNonHolidayCalendar(calendars)?.id;
    }

    const result = await CapacitorCalendar.createEventWithPrompt(promptOptions);

    if (result.id) {
      getEventIdInput().value = result.id;
    }
    if (result.ics) {
      await presentToast(`Downloaded ${result.ics.name} — open it in your calendar app.`);
    } else if (isWeb) {
      await presentToast('Create event cancelled.');
    }
    console.log('#createEventWithPrompt', result);
  });
}
