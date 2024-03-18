import { registerPlugin } from '@capacitor/core';
import { CalendarChooserDisplayStyle } from './schemas/enums/calendar-chooser-display-style';
import { CalendarChooserSelectionStyle } from './schemas/enums/calendar-chooser-selection-style';
import { PluginPermission } from './schemas/enums/plugin-permission';
import { ReminderRecurrenceFrequency } from './schemas/enums/reminder-recurrence-frequency';
import type { CapacitorCalendarPlugin } from './definitions';
import type { Calendar } from './schemas/interfaces/calendar';
import type { RemindersList } from './schemas/interfaces/reminders-list';
import type { PluginPermissionsMap } from './schemas/interfaces/plugin-permissions-map';
import type { ReminderRecurrenceRule } from './schemas/interfaces/reminder-recurrence-rule';

const CapacitorCalendar = registerPlugin<CapacitorCalendarPlugin>(
  'CapacitorCalendar',
    {
        web: () => import('./web').then(m => new m.CapacitorCalendarWeb()),
    },
);

export * from './definitions';
export type {
    Calendar,
    RemindersList,
    ReminderRecurrenceRule
}
export {
    CalendarChooserSelectionStyle,
    CalendarChooserDisplayStyle,
    PluginPermission,
    PluginPermissionsMap,
    ReminderRecurrenceFrequency,
    CapacitorCalendar,
};
