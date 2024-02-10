import { Component } from '@angular/core';
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonItem, IonLabel,
  IonList, IonListHeader,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CalendarEventActionResult, CapacitorCalendar} from "@ebarooni/capacitor-calendar";
import {addIcons} from "ionicons";
import { informationCircle } from 'ionicons/icons';
import {ThemeToggleComponent} from "./theme-toggle/theme-toggle.component";
import {HeaderComponent} from "./header/header.component";
import {CondensedHeaderComponent} from "./condensed-header/condensed-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel, IonListHeader, IonIcon, ThemeToggleComponent, HeaderComponent, CondensedHeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly headerTitle = 'CapacitorCalendar';

  constructor() {
    addIcons({
      'information-circle': informationCircle
    });
  }

  public createEventWithPrompt(): Promise<{ result: CalendarEventActionResult }> {
    return CapacitorCalendar.createEventWithPrompt();
  }
}
