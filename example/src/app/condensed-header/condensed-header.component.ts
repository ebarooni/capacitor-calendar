import {Component, Input} from '@angular/core';
import {IonHeader, IonLabel, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-condensed-header',
  templateUrl: './condensed-header.component.html',
  imports: [
    IonHeader,
    IonLabel,
    IonToolbar
  ],
  standalone: true
})
export class CondensedHeaderComponent{
  @Input() title?: string;
}
