import { Component } from '@angular/core';
import {IonApp, IonContent} from "@ionic/angular/standalone";
import {ThemeToggleComponent} from "./theme-toggle/theme-toggle.component";
import {HeaderComponent} from "./header/header.component";
import {CondensedHeaderComponent} from "./condensed-header/condensed-header.component";
import {MethodsListComponent} from "./methods-list/methods-list.component";
import {PermissionsStatusComponent} from "./permissions-status/permissions-status.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,
    IonContent,
    ThemeToggleComponent,
    HeaderComponent,
    CondensedHeaderComponent,
    MethodsListComponent,
    PermissionsStatusComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly headerTitle = 'CapacitorCalendar';
}
