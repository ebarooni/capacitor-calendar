import { Injectable } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, scan, shareReplay} from "rxjs";

export interface State {
  isDarkMode: boolean;
  logs: string[];
}

const initialState = <State>{
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  logs: []
}

@Injectable()
export class StoreService {
  private readonly stateSubject: BehaviorSubject<Partial<State>> = new BehaviorSubject<Partial<State>>(initialState);
  readonly state$: Observable<State> = this.stateSubject.asObservable()
    .pipe(
      scan((currentState, partialState): State => ({
        ...currentState,
        ...partialState
      }), initialState),
      shareReplay(1)
    );

  updateState(update: Partial<State>): void {
    this.stateSubject.next(update);
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
}
