import {Component, Input} from '@angular/core';
import {IonHeader, IonText, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {Capacitor} from "@capacitor/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText
  ],
  standalone: true
})
export class HeaderComponent {
  @Input() title?: string;
  readonly isNativePlatform = Capacitor.isNativePlatform();
}
