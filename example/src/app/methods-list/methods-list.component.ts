import { Component } from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {informationCircle} from "ionicons/icons";
import {CalendarEventActionResult, CapacitorCalendar} from "@ebarooni/capacitor-calendar";

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
  constructor() {
    addIcons({ 'information-circle': informationCircle });
  }

  public createEventWithPrompt(): Promise<{ result: CalendarEventActionResult }> {
    return CapacitorCalendar.createEventWithPrompt();
  }
}
