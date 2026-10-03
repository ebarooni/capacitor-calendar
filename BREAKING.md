# Breaking Changes

Breaking changes by release, with migration steps.
See [CHANGELOG.md](CHANGELOG.md) for the full release history.

## Contents

- [Version 8.x.x](#version-8xx)
  - [8.8.0](#880)
  - [8.7.0](#870)

# Version 8.x.x

## 8.8.0

### Invalid reminders-list `color` rejects

On iOS, `createRemindersList(...)` and `updateRemindersList(...)` used to ignore unrecognized `color` strings (create left EventKit’s color unset; update left the list color unchanged).

Invalid values now reject with `Invalid color format.`, same as calendar color parsing. Valid input is a known system name (`blue`, …) or hex `#RRGGBB` / `#RRGGBBAA`.

#### Migration

1. Pass only a `SystemColorName` or a valid hex string for `color`.
2. Catch `Invalid color format.` if you previously relied on silent ignore.

See [CHANGELOG.md](CHANGELOG.md#880).

## 8.7.0

### Reminder recurrence `frequency` is a string

On iOS, reminder recurrence frequency used EventKit integer raw values (`0`–`3`) in these places:

- `modifyReminder(...)` input
- `getReminderById(...)` / `getRemindersFromLists(...)` read-back

The public TypeScript contract already used string `RecurrenceFrequency` (`'daily' | 'weekly' | 'monthly' | 'yearly'`). Create had been migrated earlier; modify and read-back now match.

#### Before

```ts
await CapacitorCalendar.modifyReminder({
  id,
  recurrence: {
    frequency: 1, // or ReminderRecurrenceFrequency.WEEKLY
    interval: 1,
  },
});

const { result } = await CapacitorCalendar.getReminderById({ id });
result?.recurrence[0]?.frequency; // 0 | 1 | 2 | 3
```

#### After

```ts
await CapacitorCalendar.modifyReminder({
  id,
  recurrence: {
    frequency: 'weekly',
    interval: 1,
  },
});

const { result } = await CapacitorCalendar.getReminderById({ id });
result?.recurrence[0]?.frequency; // 'daily' | 'weekly' | 'monthly' | 'yearly'
```

#### Migration

1. Replace numeric frequencies and `ReminderRecurrenceFrequency.*` with string literals (`'daily'`, `'weekly'`, `'monthly'`, `'yearly'`).
2. Update any read-back checks that compared frequency to `0`–`3` or to `ReminderRecurrenceFrequency` enum members.
3. Prefer `RecurrenceRule` / `RecurrenceFrequency`. `ReminderRecurrenceFrequency` and `ReminderRecurrenceRule` remain deprecated.

Passing a non-string frequency (for example `0`) now rejects with `Invalid frequency.`
