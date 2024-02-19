import { Component } from '@angular/core';
import {IonApp, IonRouterOutlet} from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  imports: [
    IonApp,
    IonRouterOutlet
  ],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {}
