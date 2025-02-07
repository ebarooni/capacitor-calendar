import type {
  CheckAllPermissionsResult,
  RequestAllPermissionsResult,
} from "./sub-definitions/calendar-access";
import type { Calendar } from "./schemas/interfaces/calendar";
import { CalendarChooserDisplayStyle } from "./schemas/enums/calendar-chooser-display-style";
import { CalendarChooserSelectionStyle } from "./schemas/enums/calendar-chooser-selection-style";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import { CalendarPermissionScope } from "./schemas/enums/calendar-permission-scope";
import type { CalendarSource } from "./schemas/interfaces/calendar-source";
import { CalendarSourceType } from "./schemas/enums/calendar-source-type";
import { CalendarType } from "./schemas/enums/calendar-type";
import type { CapacitorCalendarPlugin } from "./definitions";
import type { CreateEventWithPromptOptions } from "./sub-definitions/event-operations";
import { EventSpan } from "./schemas/enums/event-span";
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
export type {
  Calendar,
  RemindersList,
  ReminderRecurrenceRule,
  CalendarSource,
  CheckAllPermissionsResult,
  RequestAllPermissionsResult,
  CreateEventWithPromptOptions,
};
export {
  CalendarChooserSelectionStyle,
  CalendarChooserDisplayStyle,
  ReminderRecurrenceFrequency,
  CalendarEvent,
  Reminder,
  EventSpan,
  CalendarSourceType,
  CalendarType,
  CalendarPermissionScope,
  CapacitorCalendar,
};
