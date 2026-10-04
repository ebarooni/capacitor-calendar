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

#### Before

```ts
// Unknown name was ignored (create: no color set; update: color unchanged)
await CapacitorCalendar.createRemindersList({ title: 'Groceries', color: 'navy' });
```

#### After

```ts
// Rejects with Invalid color format.
await CapacitorCalendar.createRemindersList({ title: 'Groceries', color: 'navy' });

// Valid: system name or hex
await CapacitorCalendar.createRemindersList({ title: 'Groceries', color: 'indigo' });
await CapacitorCalendar.createRemindersList({ title: 'Groceries', color: '#007AFF' });
```

#### Migration

1. Pass only a `SystemColorName` or a valid hex string (`#RRGGBB` / `#RRGGBBAA`) for `color`.
2. Catch `Invalid color format.` if you previously relied on silent ignore.

Omitting `color` on create still leaves the list color unset so the platform chooses it.

See [CHANGELOG.md](CHANGELOG.md#880).

### Calendar `color` TypeScript type

`CreateCalendarOptions.color` and `ModifyCalendarOptions.color` are now a `SystemColorName` or hex `#RRGGBB` / `#RRGGBBAA` instead of unbound `string`. Reminders-list create/update use the same inline union (no `RemindersListColor` / `SystemOrHexColor` aliases). Runtime hex write and omit-on-create (`#007AFF`) are unchanged. On iOS, named colors are newly accepted for calendars; on Android, named colors still reject with `Invalid color format.`

#### Migration

1. Pass a `SystemColorName` or hex template literal (`#RRGGBB` / `#RRGGBBAA`), or narrow/cast unbound `string` values.
2. On Android, keep using hex only for calendar color write.

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
