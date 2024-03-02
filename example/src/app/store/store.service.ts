import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, scan} from "rxjs";

export interface State {
  darkModeEnabled: boolean;
  logs: string[];
}

const initialState = <State>{
  darkModeEnabled: false,
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
      }), initialState)
    );

  updateState(update: Partial<State>): void {
    this.stateSubject.next(update);
  }
}
