import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, scan, shareReplay } from 'rxjs';
import { PluginPermission, PluginPermissionsMap } from '@ebarooni/capacitor-calendar';

export interface Log {
  message: string;
  timestamp: number;
}

export interface State {
  isDarkMode: boolean;
  logs: Log[];
  unreadLogs: number;
  permissions: PluginPermissionsMap;
  appVersion: string;
}

type PartialStateUpdate<T> = {
  [P in keyof T]?: PartialStateUpdate<T[P]>;
};

const initialState = <State>{
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  logs: [],
  unreadLogs: 0,
  permissions: {
    [PluginPermission.READ_CALENDAR]: 'prompt',
    [PluginPermission.WRITE_CALENDAR]: 'prompt',
    [PluginPermission.READ_REMINDERS]: 'prompt',
    [PluginPermission.WRITE_REMINDERS]: 'prompt',
  },
  appVersion: '0.5.0',
};

@Injectable()
export class StoreService {
  private readonly stateSubject: BehaviorSubject<PartialStateUpdate<State>> = new BehaviorSubject<
    PartialStateUpdate<State>
  >(initialState);
  readonly state$: Observable<State> = this.stateSubject.asObservable().pipe(
    scan(
      (currentState, partialState): State => ({
        ...currentState,
        ...partialState,
        permissions: partialState?.permissions
          ? { ...currentState.permissions, ...(partialState.permissions as PluginPermissionsMap) }
          : currentState.permissions,
        logs: partialState?.logs?.length === 0 ? [] : ((partialState?.logs as Log[]) || []).concat(currentState.logs),
        unreadLogs: partialState?.logs
          ? currentState.unreadLogs + partialState.logs.length
          : partialState?.unreadLogs ?? currentState.unreadLogs,
      }),
      initialState
    ),
    shareReplay(1)
  );

  updateState(update: PartialStateUpdate<State>): void {
    this.stateSubject.next(update);
  }

  dispatchLog(log: string): void {
    this.updateState({ logs: [{ message: log, timestamp: Date.now() }] });
  }

  readonly selectIsDarkMode$ = this.state$.pipe(
    map((state) => state.isDarkMode),
    distinctUntilChanged()
  );

  readonly selectLogs$ = this.state$.pipe(
    map((state) => state.logs),
    distinctUntilChanged()
  );

  readonly selectUnreadLogs$ = this.state$.pipe(
    map((state) => state.unreadLogs),
    distinctUntilChanged()
  );

  readonly selectReadCalendarStatus$ = this.state$.pipe(
    map((state) => state.permissions),
    map(({ readCalendar }) => readCalendar),
    distinctUntilChanged()
  );

  readonly selectWriteCalendarStatus$ = this.state$.pipe(
    map((state) => state.permissions),
    map(({ writeCalendar }) => writeCalendar),
    distinctUntilChanged()
  );

  readonly selectReadRemindersStatus$ = this.state$.pipe(
    map((state) => state.permissions),
    map(({ readReminders }) => readReminders),
    distinctUntilChanged()
  );

  readonly selectWriteRemindersStatus$ = this.state$.pipe(
    map((state) => state.permissions),
    map(({ writeReminders }) => writeReminders),
    distinctUntilChanged()
  );

  readonly selectAppVersion$ = this.state$.pipe(
    map((state) => state.appVersion),
    distinctUntilChanged()
  );
}
