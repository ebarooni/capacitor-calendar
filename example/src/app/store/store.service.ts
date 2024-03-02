import { Injectable } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, scan, shareReplay} from "rxjs";

export interface Log {
  message: string;
  timestamp: number;
}

export interface State {
  isDarkMode: boolean;
  logs: Log[];
  unreadLogs: number;
}

const initialState = <State>{
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  logs: [],
  unreadLogs: 0
}

@Injectable()
export class StoreService {
  private readonly stateSubject: BehaviorSubject<Partial<State>> = new BehaviorSubject<Partial<State>>(initialState);
  readonly state$: Observable<State> = this.stateSubject.asObservable()
    .pipe(
      scan((currentState, partialState): State => ({
        ...currentState,
        ...partialState,
        logs: (partialState?.logs || []).concat(currentState.logs),
        unreadLogs: partialState?.logs
          ? currentState.unreadLogs + partialState.logs.length
          : (partialState?.unreadLogs ?? currentState.unreadLogs)
      }), initialState),
      shareReplay(1)
    );

  updateState(update: Partial<State>): void {
    this.stateSubject.next(update);
  }

  dispatchLog(log: string): void {
    this.updateState({ logs: [{ message: log, timestamp: Date.now() }] });
  }

  readonly selectIsDarkMode$ = this.state$
    .pipe(
      map((state) => state.isDarkMode),
      distinctUntilChanged()
    );

  readonly selectLogs$ = this.state$
    .pipe(
      map((state) => state.logs),
      distinctUntilChanged()
    );

  readonly selectUnreadLogs$ = this.state$
    .pipe(
      map((state) => state.unreadLogs),
      distinctUntilChanged()
    );
}
