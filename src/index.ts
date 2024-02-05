import { registerPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';

const CapacitorCalendar = registerPlugin<CapacitorCalendarPlugin>(
  'CapacitorCalendar',
);

export * from './definitions';
export { CapacitorCalendar };
