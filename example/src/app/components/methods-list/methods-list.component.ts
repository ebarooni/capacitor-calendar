import { Component } from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/angular/standalone";
import {CapacitorCalendar} from "@ebarooni/capacitor-calendar";
import {PermissionStatusService} from "../permissions-status/permission-status.service";
import {StoreService} from "../../store/store.service";

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

  constructor(
    readonly permissionStatusService: PermissionStatusService,
    private readonly storeService: StoreService
  ) {}

  public createEventWithPrompt(): void {
    CapacitorCalendar.createEventWithPrompt()
      .then((response) => this.storeService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }

  public selectCalendarsWithPrompt(): void {
    CapacitorCalendar.selectCalendarsWithPrompt()
      .then((response) => this.storeService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }
}
