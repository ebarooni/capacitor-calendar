import { Injectable } from '@angular/core';
import {BehaviorSubject, map, merge, Observable, Subject, switchMap} from "rxjs";
import {PermissionState} from "@capacitor/core";
import {CapacitorCalendar} from "@ebarooni/capacitor-calendar";

@Injectable({
  providedIn: 'root'
})
export class PermissionStatusService {
  private readonly checkAllPermissionsSubject = new Subject<void>();
  readonly checkAllPermissions$ = this.checkAllPermissionsSubject.asObservable()
    .pipe(switchMap(() => CapacitorCalendar.checkAllPermissions()))
  private readonly readCalendarPermissionSubject = new BehaviorSubject<void>(void 0);
  readonly readCalendarPermission$: Observable<PermissionState> = merge(
    this.checkAllPermissions$.pipe(map((result) => result.readCalendar)),
    this.readCalendarPermissionSubject.asObservable()
      .pipe(
        switchMap(() => CapacitorCalendar.checkPermission({ alias: 'readCalendar' })),
        map((response) => response.result)
      )
  );

  requestPermission(alias: 'readCalendar'): void {
    switch (alias) {
      case 'readCalendar':
        CapacitorCalendar.requestPermission({ alias: alias })
          .then(() => this.readCalendarPermissionSubject.next())
          .catch((error) => console.warn(error));
        break;
      default:
        return;
    }
  }

  requestAllPermissions(): void {
    CapacitorCalendar.requestAllPermissions()
      .then(() => {
        this.readCalendarPermissionSubject.next();
      })
      .catch((error) => console.warn(error));
  }

  checkAllPermissions(): void {
    this.checkAllPermissionsSubject.next();
  }
}
