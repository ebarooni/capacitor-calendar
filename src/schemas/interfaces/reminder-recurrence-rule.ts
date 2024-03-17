import {ReminderRecurrenceFrequency} from "../enums/reminder-recurrence-frequency";

export interface ReminderRecurrenceRule {
    frequency: ReminderRecurrenceFrequency;
    interval: number;
    end?: number;
}
