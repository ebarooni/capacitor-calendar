import { registerPlugin } from '@capacitor/core';

import type { CapacitorCalendarPlugin } from './definitions';
import { AttendeeRole } from './schemas/enums/attendee-role';
import { AttendeeStatus } from './schemas/enums/attendee-status';
import { AttendeeType } from './schemas/enums/attendee-type';
import { CalendarChooserDisplayStyle } from './schemas/enums/calendar-chooser-display-style';
import { CalendarPermissionScope } from './schemas/enums/calendar-permission-scope';
import { CalendarSourceType } from './schemas/enums/calendar-source-type';
import { CalendarType } from './schemas/enums/calendar-type';
import { EventAvailability } from './schemas/enums/event-availability';
import { EventSpan } from './schemas/enums/event-span';
import { EventStatus } from './schemas/enums/event-status';
import { ReminderRecurrenceFrequency } from './schemas/enums/reminder-recurrence-frequency';
import type { Calendar } from './schemas/interfaces/calendar';
import type { CalendarEvent } from './schemas/interfaces/calendar-event';
import type { CalendarSource } from './schemas/interfaces/calendar-source';
import type { CheckPermissionOptions } from './schemas/interfaces/check-permission-options';
import type { CreateCalendarOptions } from './schemas/interfaces/create-calendar-options';
import type { CreateCalendarResult } from './schemas/interfaces/create-calendar-result';
import type { CreateEventOptions } from './schemas/interfaces/create-event-options';
import type { CreateEventWithPromptOptions } from './schemas/interfaces/create-event-with-prompt-options';
import type { CreateReminderOptions } from './schemas/interfaces/create-reminder-options';
import type { CreateRemindersListOptions } from './schemas/interfaces/create-reminders-list-options';
import type { CreateRemindersListResult } from './schemas/interfaces/create-reminders-list-result';
import type { DeleteCalendarOptions } from './schemas/interfaces/delete-calendar-options';
import type { DeleteEventOptions } from './schemas/interfaces/delete-event-options';
import type { DeleteEventWithPromptOptions } from './schemas/interfaces/delete-event-with-prompt-options';
import type { DeleteEventsByIdOptions } from './schemas/interfaces/delete-events-by-id-options';
import type { DeleteReminderOptions } from './schemas/interfaces/delete-reminder-options';
import type { DeleteReminderWithPromptOptions } from './schemas/interfaces/delete-reminder-with-prompt-options';
import type { DeleteRemindersByIdOptions } from './schemas/interfaces/delete-reminders-by-id-options';
import type { DeleteRemindersListOptions } from './schemas/interfaces/delete-reminders-list-options';
import type { EventGuest } from './schemas/interfaces/event-guest';
import type { FetchAllCalendarSourcesResult } from './schemas/interfaces/fetch-all-calendar-sources-result';
import type { GetDefaultCalendarOptions } from './schemas/interfaces/get-default-calendar-options';
import type { GetReminderByIdOptions } from './schemas/interfaces/get-reminder-by-id-options';
import type { GetRemindersFromListsOptions } from './schemas/interfaces/get-reminders-from-lists-options';
import type { ListCalendarsResult } from './schemas/interfaces/list-calendars-result';
import type { ListEventsInRangeOptions } from './schemas/interfaces/list-events-in-range-options';
import type { ModifyCalendarOptions } from './schemas/interfaces/modify-calendar-options';
import type { ModifyEventOptions } from './schemas/interfaces/modify-event-options';
import type { ModifyEventWithPromptOptions } from './schemas/interfaces/modify-event-with-prompt-options';
import type { ModifyReminderOptions } from './schemas/interfaces/modify-reminder-options';
import type { OpenCalendarOptions } from './schemas/interfaces/open-calendar-options';
import type { RecurrenceRule } from './schemas/interfaces/recurrence-rule';
import type { Reminder } from './schemas/interfaces/reminder';
import type { ReminderRecurrenceRule } from './schemas/interfaces/reminder-recurrence-rule';
import type { RemindersList } from './schemas/interfaces/reminders-list';
import type { RequestPermissionOptions } from './schemas/interfaces/request-permission-options';
import type { SelectCalendarsWithPromptOptions } from './schemas/interfaces/select-calendars-with-prompt-options';
import type { SelectCalendarsWithPromptResult } from './schemas/interfaces/select-calendars-with-prompt-result';
import type { UpdateRemindersListOptions } from './schemas/interfaces/update-reminders-list-options';
import type { UpdateRemindersListResult } from './schemas/interfaces/update-reminders-list-result';
import type { EventEditAction } from './schemas/types/event-edit-action';
import type { RecurrenceFrequency } from './schemas/types/recurrence-frequency';
import type { CheckAllPermissionsResult, RequestAllPermissionsResult } from './sub-definitions/calendar-access';
import type { DeleteEventsByIdResult } from './sub-definitions/event-operations';
import type { DeleteRemindersByIdResult } from './sub-definitions/reminders-operations';

const CapacitorCalendar = registerPlugin<CapacitorCalendarPlugin>('CapacitorCalendar', {
  web: () => import('./web').then((m) => new m.CapacitorCalendarWeb()),
});

export * from './definitions';
export type {
  Calendar,
  CalendarEvent,
  CalendarSource,
  CheckAllPermissionsResult,
  CheckPermissionOptions,
  CreateCalendarOptions,
  CreateCalendarResult,
  CreateEventOptions,
  CreateEventWithPromptOptions,
  CreateReminderOptions,
  CreateRemindersListOptions,
  CreateRemindersListResult,
  DeleteCalendarOptions,
  DeleteEventOptions,
  DeleteEventWithPromptOptions,
  DeleteEventsByIdOptions,
  DeleteEventsByIdResult,
  DeleteReminderOptions,
  DeleteReminderWithPromptOptions,
  DeleteRemindersByIdOptions,
  DeleteRemindersByIdResult,
  DeleteRemindersListOptions,
  EventEditAction,
  EventGuest,
  FetchAllCalendarSourcesResult,
  GetDefaultCalendarOptions,
  GetReminderByIdOptions,
  GetRemindersFromListsOptions,
  ListCalendarsResult,
  ListEventsInRangeOptions,
  ModifyCalendarOptions,
  ModifyEventOptions,
  ModifyEventWithPromptOptions,
  ModifyReminderOptions,
  OpenCalendarOptions,
  RecurrenceRule,
  Reminder,
  ReminderRecurrenceRule,
  RemindersList,
  RequestAllPermissionsResult,
  RequestPermissionOptions,
  SelectCalendarsWithPromptOptions,
  SelectCalendarsWithPromptResult,
  UpdateRemindersListOptions,
  UpdateRemindersListResult,
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
