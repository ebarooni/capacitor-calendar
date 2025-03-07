import type {
  CheckAllPermissionsResult,
  RequestAllPermissionsResult,
} from "./sub-definitions/calendar-access";
import { AttendeeRole } from "./schemas/enums/attendee-role";
import { AttendeeStatus } from "./schemas/enums/attendee-status";
import { AttendeeType } from "./schemas/enums/attendee-type";
import type { Calendar } from "./schemas/interfaces/calendar";
import { CalendarChooserDisplayStyle } from "./schemas/enums/calendar-chooser-display-style";
import type { CalendarEvent } from "./schemas/interfaces/calendar-event";
import { CalendarPermissionScope } from "./schemas/enums/calendar-permission-scope";
import type { CalendarSource } from "./schemas/interfaces/calendar-source";
import { CalendarSourceType } from "./schemas/enums/calendar-source-type";
import { CalendarType } from "./schemas/enums/calendar-type";
import type { CapacitorCalendarPlugin } from "./definitions";
import type { CreateCalendarOptions } from "./schemas/interfaces/create-calendar-options";
import type { CreateEventOptions } from "./schemas/interfaces/create-event-options";
import type { CreateEventWithPromptOptions } from "./schemas/interfaces/create-event-with-prompt-options";
import type { CreateReminderOptions } from "./schemas/interfaces/create-reminder-options";
import type { DeleteCalendarOptions } from "./schemas/interfaces/delete-calendar-options";
import type { DeleteEventOptions } from "./schemas/interfaces/delete-event-options";
import type { DeleteEventWithPromptOptions } from "./schemas/interfaces/delete-event-with-prompt-options";
import type { DeleteEventsByIdOptions } from "./schemas/interfaces/delete-events-by-id-options";
import type { DeleteEventsByIdResult } from "./sub-definitions/event-operations";
import type { DeleteReminderOptions } from "./schemas/interfaces/delete-reminder-options";
import type { DeleteReminderWithPromptOptions } from "./schemas/interfaces/delete-reminder-with-prompt-options";
import type { DeleteRemindersByIdOptions } from "./schemas/interfaces/delete-reminders-by-id-options";
import type { DeleteRemindersByIdResult } from "./sub-definitions/reminders-operations";
import { EventAvailability } from "./schemas/enums/event-availability";
import type { EventEditAction } from "./schemas/types/event-edit-action";
import { EventGuest } from "./schemas/interfaces/event-guest";
import { EventSpan } from "./schemas/enums/event-span";
import { EventStatus } from "./schemas/enums/event-status";
import type { GetReminderByIdOptions } from "./schemas/interfaces/get-reminder-by-id-options";
import type { GetRemindersFromListsOptions } from "./schemas/interfaces/get-reminders-from-lists-options";
import type { ListEventsInRangeOptions } from "./schemas/interfaces/list-events-in-range-options";
import type { ModifyCalendarOptions } from "./schemas/interfaces/modify-calendar-options";
import type { ModifyEventOptions } from "./schemas/interfaces/modify-event-options";
import type { ModifyEventWithPromptOptions } from "./schemas/interfaces/modify-event-with-prompt-options";
import type { ModifyReminderOptions } from "./schemas/interfaces/modify-reminder-options";
import type { OpenCalendarOptions } from "./schemas/interfaces/open-calendar-options";
import { RecurrenceFrequency } from "./schemas/enums/recurrence-frequency";
import type { RecurrenceRule } from "./schemas/interfaces/recurrence-rule";
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
  CalendarSource,
  OpenCalendarOptions,
  CreateCalendarOptions,
  DeleteCalendarOptions,
  ReminderRecurrenceRule,
  RecurrenceRule,
  CreateReminderOptions,
  DeleteRemindersByIdOptions,
  DeleteRemindersByIdResult,
  DeleteReminderOptions,
  ModifyReminderOptions,
  GetReminderByIdOptions,
  Reminder,
  GetRemindersFromListsOptions,
  DeleteEventsByIdOptions,
  DeleteEventsByIdResult,
  DeleteEventOptions,
  DeleteEventWithPromptOptions,
  ListEventsInRangeOptions,
  CalendarEvent,
  ModifyCalendarOptions,
  DeleteReminderWithPromptOptions,
};
export {
  CalendarPermissionScope,
  EventAvailability,
  EventSpan,
  CalendarChooserDisplayStyle,
  CalendarType,
  CalendarSourceType,
  ReminderRecurrenceFrequency,
  RecurrenceFrequency,
  EventStatus,
  AttendeeRole,
  AttendeeType,
  AttendeeStatus,
  CapacitorCalendar,
};
