import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import type { DatetimeChangeEventDetail } from '@ionic/core/components';
import { MillisToIsoPipe } from '../../../pipes/millis-to-iso/millis-to-iso.pipe';

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
    MillisToIsoPipe,
  ],
  standalone: true,
})
export class EventsListComponent implements OnInit {
  @Input() calendarEvents: CalendarEvent[] = [];
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() modifyEvent = new EventEmitter<string>();
  @Output() timeChanged = new EventEmitter<void>();
  @Output() done = new EventEmitter<void>();
  public fromTime = Date.now();
  public toTime = this.fromTime + 2 * 7 * 24 * 60 * 60 * 1000;

  constructor() {
    addIcons({
      trash: trash,
      create: create,
    });
  }

  ngOnInit() {
    this.timeChanged.emit();
  }

  fromTimeChanged(event: CustomEvent<DatetimeChangeEventDetail>): void {
    try {
      this.fromTime = new Date(event.detail.value as string).getTime();
    } catch (error) {
      console.error(error, 'failed to convert fromTime to milliseconds');
    } finally {
      this.timeChanged.emit();
    }
  }

  toTimeChanged(event: CustomEvent<DatetimeChangeEventDetail>): void {
    try {
      this.toTime = new Date(event.detail.value as string).getTime();
    } catch (error) {
      console.error(error, 'failed to convert toTime to milliseconds');
    } finally {
      this.timeChanged.emit();
    }
  }
}
