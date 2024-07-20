import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { IonModal } from '@ionic/angular/standalone';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { CalendarEvent, CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { EventsListComponent } from './events-list/events-list.component';
import { LetDirective } from '@ngrx/component';
import { EventView } from './event-view';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventUpdate } from './event-update';

@Component({
  selector: 'app-events-action-modal',
  templateUrl: './events-action-modal.component.html',
  styleUrls: ['./events-action-modal.component.scss'],
  imports: [IonModal, EventsListComponent, LetDirective, EventDetailComponent],
  standalone: true,
})
export class EventsActionModalComponent {
  @Output() deleteEvents = new EventEmitter<string>();
  @Output() modifyEvent = new EventEmitter<{
    id: string;
    update: EventUpdate;
  }>();
  @ViewChild('modal') modal?: IonModal;
  public loading = false;
  public currentView = this.eventView.EVENTS_LIST;
  readonly calendarEvents$ = new BehaviorSubject<CalendarEvent[]>([]);
  readonly selectedEvent$ = new ReplaySubject<CalendarEvent>(1);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  get eventView(): typeof EventView {
    return EventView;
  }

  present(): Promise<void> {
    this.loading = true;
    if (this.modal) {
      this.modal.presentingElement =
        this.document.querySelector('app-api.ion-page') ?? undefined;
      return this.modal.present();
    } else {
      this.loading = false;
      throw new Error('Modal not present');
    }
  }

  dispose(): void {
    this.currentView = this.eventView.EVENTS_LIST;
  }

  openEventDetailView(event: CalendarEvent): void {
    this.selectedEvent$.next(event);
    this.currentView = this.eventView.EVENT_DETAIL;
  }

  fetchEvents(startDate: number, endDate: number): Promise<void> {
    return CapacitorCalendar.listEventsInRange({
      startDate: startDate,
      endDate: endDate,
    })
      .then(({ result }) => this.calendarEvents$.next(result))
      .catch((error) => console.warn(error));
  }
}
