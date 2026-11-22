import { getCalendarLinks } from '@ebarooni/capacitor-calendar';
import { injectMethodOptions } from '../utils/dom.js';
import optionsHtml from './get-calendar-links.options.html?raw';

export function registerGetCalendarLinks() {
  injectMethodOptions(optionsHtml);
  document.querySelector('#get-calendar-links').addEventListener('click', () => {
    const startDate = Date.now() + 24 * 60 * 60 * 1000;
    const links = getCalendarLinks({
      attendees: [{ email: 'guest@example.com' }],
      description: 'Created with @ebarooni/capacitor-calendar',
      endDate: startDate + 60 * 60 * 1000,
      location: 'Office',
      recurrence: { count: 4, frequency: 'weekly', interval: 1 },
      startDate,
      title: 'Planning session',
    });
    const provider = document.querySelector('#get-calendar-links-provider-select').value;
    window.open(links[provider] ?? links.google, '_blank', 'noopener');
    console.log('#getCalendarLinks', links);
  });
}
