import { Component } from '@angular/core';
import {IonApp, IonRouterOutlet} from "@ionic/angular/standalone";
import {fromEvent, map, tap} from "rxjs";
import {StoreService} from "./store/store.service";

@Component({
  selector: 'app-root',
  imports: [
    IonApp,
    IonRouterOutlet
  ],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {
  constructor(private readonly storeService: StoreService) {
    fromEvent<MediaQueryList>(
      window.matchMedia('(prefers-color-scheme: dark)'), 'change'
    )
      .pipe(map((event) => event.matches))
      .subscribe((isDarkMode) => storeService.updateState({
        isDarkMode: isDarkMode
      }));

    this.storeService.selectIsDarkMode$
      .pipe(tap((isDarkTheme) => document.body.classList.toggle('dark', isDarkTheme)))
      .subscribe();
  }
}
