import { CapacitorCalendar, EventAvailability } from '@ebarooni/capacitor-calendar';
import { pickNonHolidayCalendar } from '../utils/calendars.js';
import { optionalEventHexColor } from '../utils/color.js';
import { getInputValue } from '../utils/dom.js';
import { setEventId } from '../utils/ids.js';
import { isWebPlatform } from '../utils/platform.js';
import { presentToast } from '../utils/toast.js';

export function registerCreateEvent() {
  document.querySelector('#create-event').addEventListener('click', async () => {
    const isWeb = isWebPlatform();
    const startDate = Date.now();
    const endDate = startDate + 60 * 60 * 1000;
    const recurrenceEnd = startDate + 14 * 24 * 60 * 60 * 1000;
    const options = {
      alerts: [-1440, -60, 30],
      attendees: [{ email: 'guest@example.com', name: 'Alex Guest' }],
      availability: EventAvailability.BUSY,
      ...optionalEventHexColor('#create-event-color-select'),
      commit: true,
      description: 'Created with @ebarooni/capacitor-calendar',
      endDate,
      icsFileName: 'recurring-standup.ics',
      isAllDay: false,
      location: 'Conference Room A',
      organizer: 'organizer@example.com',
      recurrence: {
        end: recurrenceEnd,
        frequency: 'daily',
        interval: 2,
      },
      startDate,
      title: getInputValue('#create-event-title-input', 'Recurring standup'),
      url: 'https://example.com/standup',
    };

    // listCalendars is not implemented on web; calendarId is ignored there anyway
    if (!isWeb) {
      const { result: calendars } = await CapacitorCalendar.listCalendars();
      options.calendarId = pickNonHolidayCalendar(calendars)?.id;
    }

    const result = await CapacitorCalendar.createEvent({
      ...options,
      autoDownloadIcsFile: true,
      icsFileName: 'recurring-standup.ics',
    });

    setEventId(result.id);
    if (result.ics) {
      await presentToast(`Downloaded ${result.ics.name} — open it in your calendar app.`);
    }
    console.log('#createEvent', result);
  });
}
