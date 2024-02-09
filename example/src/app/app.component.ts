import { Component } from '@angular/core';
import {IonApp, IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {CalendarEventActionResult, CapacitorCalendar} from "@ebarooni/capacitor-calendar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public createEventWithPrompt(): Promise<{ result: CalendarEventActionResult }> {
    return CapacitorCalendar.createEventWithPrompt();
  }
}
