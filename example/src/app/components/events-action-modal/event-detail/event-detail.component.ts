import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { checkmark } from 'ionicons/icons';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CalendarEvent } from '@ebarooni/capacitor-calendar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    IonLabel,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonTextarea,
  ],
})
export class EventDetailComponent implements OnInit {
  @Input({ required: true }) selectedEvent!: CalendarEvent;
  @Output() closeEventDetailView = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<typeof this.eventDetailForm.value>();
  readonly eventDetailForm = new FormGroup({
    title: new FormControl<string>(''),
    location: new FormControl<string>(''),
    isAllDay: new FormControl<boolean>(false),
    startDate: new FormControl<string>(
      this.getCurrentIsoTimeInLocalTime(Date.now()),
    ),
    endDate: new FormControl<string>(
      this.getCurrentIsoTimeInLocalTime(Date.now() + 3600 * 1000),
    ),
    calendarId: new FormControl<string>(''),
    url: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  constructor() {
    addIcons({
      checkmark: checkmark,
    });
  }

  getCurrentIsoTimeInLocalTime(timestamp: number): string {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(timestamp - timezoneOffset).toISOString().slice(0, -1);
  }

  ngOnInit(): void {
    const title = this.selectedEvent?.title ?? '';
    const location = this.selectedEvent?.location ?? '';
    const startDate = this.selectedEvent.startDate ?? Date.now();
    const endDate = this.selectedEvent.endDate ?? Date.now() + 3600 * 1000;
    const calendarId = this.selectedEvent?.calendarId ?? '';
    const url = this.selectedEvent?.url ?? '';
    const description = this.selectedEvent?.description ?? '';

    this.eventDetailForm.setValue({
      title: title,
      location: location,
      isAllDay: this.selectedEvent?.isAllDay ?? false,
      startDate: this.getCurrentIsoTimeInLocalTime(startDate),
      endDate: this.getCurrentIsoTimeInLocalTime(endDate),
      calendarId: calendarId,
      url: url,
      description: description,
    });
  }

  submitChanges(event: SubmitEvent): void {
    event.preventDefault();
    this.saveChanges.emit(this.eventDetailForm.value);
  }
}
