import type { Calendar } from "./schemas/interfaces/calendar";
import { CalendarChooserDisplayStyle } from "./schemas/enums/calendar-chooser-display-style";
import { CalendarChooserSelectionStyle } from "./schemas/enums/calendar-chooser-selection-style";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import type { CalendarSource } from "./schemas/interfaces/calendar-source";
import { CalendarSourceType } from "./schemas/enums/calendar-source-type";
import { CalendarType } from "./schemas/enums/calendar-type";
import type { CapacitorCalendarPlugin } from "./definitions";
import { EventSpan } from "./schemas/enums/event-span";
import { PluginPermission } from "./schemas/enums/plugin-permission";
import type { PluginPermissionsMap } from "./schemas/interfaces/plugin-permissions-map";
import type { Reminder } from "./schemas/interfaces/reminder";
import { ReminderRecurrenceFrequency } from "./schemas/enums/reminder-recurrence-frequency";
import type { ReminderRecurrenceRule } from "./schemas/interfaces/reminder-recurrence-rule";
import type { RemindersList } from "./schemas/interfaces/reminders-list";
import { registerPlugin } from "@capacitor/core";

const CapacitorCalendar = registerPlugin<CapacitorCalendarPlugin>(
  "CapacitorCalendar",
  {
    web: () => import("./web").then((m) => new m.CapacitorCalendarWeb()),
  },
);

export * from "./definitions";
export type { Calendar, RemindersList, ReminderRecurrenceRule, CalendarSource };
export {
  CalendarChooserSelectionStyle,
  CalendarChooserDisplayStyle,
  PluginPermission,
  PluginPermissionsMap,
  ReminderRecurrenceFrequency,
  CalendarEvent,
  Reminder,
  EventSpan,
  CalendarSourceType,
  CalendarType,
  CapacitorCalendar,
};
