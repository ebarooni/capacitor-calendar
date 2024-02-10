import { Component } from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonToggle} from "@ionic/angular/standalone";
import {LetDirective} from "@ngrx/component";
import {BehaviorSubject, fromEvent, map, merge, Observable, tap} from "rxjs";
import {addIcons} from "ionicons";
import {moon} from "ionicons/icons";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonToggle,
    LetDirective
  ],
  standalone: true
})
export class ThemeToggleComponent {
  private readonly darkThemeSubject = new BehaviorSubject(window.matchMedia('(prefers-color-scheme: dark)').matches);
  readonly isDarkTheme$: Observable<boolean> = merge(
    this.darkThemeSubject.asObservable(),
    fromEvent<MediaQueryList>(window.matchMedia('(prefers-color-scheme: dark)'), 'change')
      .pipe(map((event) => event.matches))
  ).pipe(tap((isDarkTheme) => document.body.classList.toggle('dark', isDarkTheme)));

  constructor() {
    addIcons({'moon': moon});
  }

  toggleDarkTheme(isDarkTheme: boolean): void {
    this.darkThemeSubject.next(!isDarkTheme);
  }
}
