import { Component, EventEmitter, Input, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { checkmark } from 'ionicons/icons';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CalendarEvent } from '@ebarooni/capacitor-calendar';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonToggle,
  ],
})
export class EventDetailComponent {
  @Input({ required: true }) selectedEvent!: CalendarEvent;
  @Output() closeEventDetailView = new EventEmitter<void>();
  @Output() saveChangesView = new EventEmitter<void>();

  constructor() {
    addIcons({
      checkmark: checkmark,
    });
  }
}
