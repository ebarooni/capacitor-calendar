import { Component } from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/angular/standalone";
import {CalendarEventActionResult, CapacitorCalendar} from "@ebarooni/capacitor-calendar";
import {PermissionStatusService} from "../permissions-status/permission-status.service";

@Component({
  selector: 'app-methods-list',
  templateUrl: './methods-list.component.html',
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader
  ],
  standalone: true
})
export class MethodsListComponent {

  constructor(readonly permissionStatusService: PermissionStatusService) {}

  public createEventWithPrompt(): Promise<{ result: CalendarEventActionResult }> {
    return CapacitorCalendar.createEventWithPrompt();
  }
}
