import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {IonContent} from "@ionic/angular/standalone";
import {ThemeToggleComponent} from "../../components/theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [
    HeaderComponent,
    IonContent,
    ThemeToggleComponent
  ],
  standalone: true
})
export class SettingsComponent {}
