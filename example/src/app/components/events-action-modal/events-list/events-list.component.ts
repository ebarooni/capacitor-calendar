import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CalendarEvent } from '@ebarooni/capacitor-calendar';
import { DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { create, trash } from 'ionicons/icons';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    DatePipe,
    IonBackButton,
    IonItemSliding,
    IonNote,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonTitle,
    IonItemOption,
    IonItemOptions,
    IonIcon,
  ],
  standalone: true,
})
export class EventsListComponent {
  @Input() calendarEvents: CalendarEvent[] = [];
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() modifyEvent = new EventEmitter<string>();
  @Output() done = new EventEmitter<void>();

  constructor() {
    addIcons({
      trash: trash,
      create: create,
    });
  }
}
