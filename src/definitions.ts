import type { CalendarAccess } from "./sub-definitions/calendar-access";
import type { CalendarOperations } from "./sub-definitions/calendar-operations";
import type { EventOperations } from "./sub-definitions/event-operations";
import type { RemindersAccess } from "./sub-definitions/reminders-access";
import type { RemindersOperations } from "./sub-definitions/reminders-operations";

export interface CapacitorCalendarPlugin
  extends CalendarAccess,
    RemindersAccess,
    EventOperations,
    CalendarOperations,
    RemindersOperations {}
