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
import type { CreateEventOptions } from "./schemas/interfaces/create-event-options";
import type { CreateEventWithPromptOptions } from "./schemas/interfaces/create-event-with-prompt-options";
import { EventAvailability } from "./schemas/enums/event-availability";
import type { EventEditAction } from "./schemas/types/event-edit-action";
import { EventGuest } from "./schemas/interfaces/event-guest";
import { EventSpan } from "./schemas/enums/event-span";
import { ModifyEventOptions } from "./schemas/interfaces/modify-event-options";
import type { ModifyEventWithPromptOptions } from "./schemas/interfaces/modify-event-with-prompt-options";
import type { Reminder } from "./schemas/interfaces/reminder";
import { ReminderRecurrenceFrequency } from "./schemas/enums/reminder-recurrence-frequency";
import type { ReminderRecurrenceRule } from "./schemas/interfaces/reminder-recurrence-rule";
import type { RemindersList } from "./schemas/interfaces/reminders-list";
import type { SelectCalendarsWithPromptOptions } from "./schemas/interfaces/select-calendars-with-prompt-options";
import { registerPlugin } from "@capacitor/core";

const CapacitorCalendar = registerPlugin<CapacitorCalendarPlugin>(
  "CapacitorCalendar",
  {
    web: () => import("./web").then((m) => new m.CapacitorCalendarWeb()),
  },
);

export * from "./definitions";
export type {
  CheckAllPermissionsResult,
  RequestAllPermissionsResult,
  CreateEventWithPromptOptions,
  ModifyEventWithPromptOptions,
  EventEditAction,
  CreateEventOptions,
  EventGuest,
  ModifyEventOptions,
  SelectCalendarsWithPromptOptions,
  Calendar,
  RemindersList,
  ReminderRecurrenceRule,
  CalendarSource,
};
export {
  CalendarPermissionScope,
  EventAvailability,
  EventSpan,
  CalendarChooserSelectionStyle,
  CalendarChooserDisplayStyle,
  ReminderRecurrenceFrequency,
  CalendarEvent,
  Reminder,
  CalendarSourceType,
  CalendarType,
  CapacitorCalendar,
};
