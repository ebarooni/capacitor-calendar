import { Component } from '@angular/core';
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonItem, IonLabel,
  IonList, IonListHeader,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CalendarEventActionResult, CapacitorCalendar} from "@ebarooni/capacitor-calendar";
import {addIcons} from "ionicons";
import { informationCircle, moon } from 'ionicons/icons';
import {BehaviorSubject, fromEvent, map, merge, Observable, tap} from "rxjs";
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel, IonListHeader, IonIcon, IonToggle, LetDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly darkThemeSubject = new BehaviorSubject(window.matchMedia('(prefers-color-scheme: dark)').matches);
  readonly isDarkTheme$: Observable<boolean> = merge(
    this.darkThemeSubject.asObservable(),
    fromEvent<MediaQueryList>(window.matchMedia('(prefers-color-scheme: dark)'), 'change')
      .pipe(map((event) => event.matches))
  ).pipe(tap((isDarkTheme) => document.body.classList.toggle('dark', isDarkTheme)));

  constructor() {
    addIcons({
      'information-circle': informationCircle,
      'moon': moon
    });
  }

  toggleDarkTheme(isDarkTheme: boolean): void {
    this.darkThemeSubject.next(!isDarkTheme);
  }

  public createEventWithPrompt(): Promise<{ result: CalendarEventActionResult }> {
    return CapacitorCalendar.createEventWithPrompt();
  }
}
