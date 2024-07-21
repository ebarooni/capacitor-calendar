import { CalendarEvent } from '@ebarooni/capacitor-calendar';

export const calendarEventStub = {
  title: 'Test Event',
  location: 'Apple Park 1',
  isAllDay: true,
  startDate: Date.now(),
  endDate: Date.now() + 2 * 60 * 60 * 1000,
  id: '36554878-31fb-469c-a8d2-80a19a63a97f',
  calendarId: '77acd714-1bd6-4195-8bf1-51ee71fcfe3b',
  eventColor: '#4ff356',
  eventTimezone: {
    region: 'Europe/Berlin',
    abbreviation: 'CET',
  },
  duration: '1 Day',
  eventEndTimezone: {
    region: 'Europe/Berlin',
    abbreviation: 'CET',
  },
  organizer: 'Self',
  description: 'A test event',
  url: 'http://localhost:4200',
} as CalendarEvent;
