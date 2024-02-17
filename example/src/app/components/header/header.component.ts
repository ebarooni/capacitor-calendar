import {Component, Input} from '@angular/core';
import {IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar
  ],
  standalone: true
})
export class HeaderComponent {
  @Input() title?: string;
}
