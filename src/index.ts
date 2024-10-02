import { registerPlugin } from "@capacitor/core";
import { CalendarChooserDisplayStyle } from "./schemas/enums/calendar-chooser-display-style";
import { CalendarChooserSelectionStyle } from "./schemas/enums/calendar-chooser-selection-style";
import { PluginPermission } from "./schemas/enums/plugin-permission";
import { RecurrenceFrequency } from "./schemas/enums/recurrence-frequency";
import { EventSpan } from "./schemas/enums/event-span";
import { CalendarSourceType } from "./schemas/enums/calendar-source-type";
import { CalendarType } from "./schemas/enums/calendar-type";
import type { CapacitorCalendarPlugin } from "./definitions";
import type { Calendar } from "./schemas/interfaces/calendar";
import type { RemindersList } from "./schemas/interfaces/reminders-list";
import type { PluginPermissionsMap } from "./schemas/interfaces/plugin-permissions-map";
import type { RecurrenceRule } from "./schemas/interfaces/recurrence-rule";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import type { Reminder } from "./schemas/interfaces/reminder";
import type { CalendarSource } from "./schemas/interfaces/calendar-source";

const CapacitorCalendar = registerPlugin<CapacitorCalendarPlugin>(
  "CapacitorCalendar",
  {
    web: () => import("./web").then((m) => new m.CapacitorCalendarWeb()),
  },
);

export * from "./definitions";
export type { Calendar, RemindersList, RecurrenceRule, CalendarSource };
export {
  CalendarChooserSelectionStyle,
  CalendarChooserDisplayStyle,
  PluginPermission,
  PluginPermissionsMap,
  RecurrenceFrequency,
  CalendarEvent,
  Reminder,
  EventSpan,
  CalendarSourceType,
  CalendarType,
  CapacitorCalendar,
};
