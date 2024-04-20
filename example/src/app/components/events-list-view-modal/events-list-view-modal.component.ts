import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonProgressBar,
  IonRow,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CalendarEvent, CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { BehaviorSubject } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { DatePipe, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-events-list-view-modal',
  templateUrl: './events-list-view-modal.component.html',
  imports: [
    IonModal,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    LetDirective,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonProgressBar,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonListHeader,
    DatePipe,
  ],
  standalone: true,
})
export class EventsListViewModalComponent {
  @Output() deleteEvents = new EventEmitter<string[]>();
  @ViewChild('modal') modal?: IonModal;
  public loading = false;
  public checkboxStates: { [key: string]: boolean } = {};
  public startDate?: Date;
  public endDate?: Date;
  readonly events$ = new BehaviorSubject<CalendarEvent[]>([]);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  present(): Promise<void> {
    this.loading = true;
    if (this.modal) {
      void this.fetchEvents().finally(() => (this.loading = false));
      this.modal.presentingElement = this.document.querySelector('app-api.ion-page') ?? undefined;
      return this.modal.present();
    } else {
      this.loading = false;
      throw new Error('Modal not present');
    }
  }

  dispatchEvents(): void {
    const idsToDelete = Object.entries(this.checkboxStates)
      .map(([key, value]) => {
        return { id: key, checked: value };
      })
      .filter((event) => event.checked)
      .map((event) => event.id);
    this.deleteEvents.emit(idsToDelete);
    void this.modal?.dismiss();
  }

  dispose(): void {
    this.checkboxStates = {};
    this.startDate = undefined;
    this.endDate = undefined;
  }

  private fetchEvents(): Promise<void> {
    const now = Date.now();
    const inTwoWeeks = now + 2 * 7 * 24 * 60 * 60 * 1000;
    this.startDate = new Date(now);
    this.endDate = new Date(inTwoWeeks);

    return CapacitorCalendar.listEventsInRange({
      startDate: now,
      endDate: now + 2 * 7 * 24 * 60 * 60 * 1000,
    })
      .then(({ result }) => this.events$.next(result))
      .catch((error) => console.warn(error));
  }
}
