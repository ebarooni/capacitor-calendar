import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { IonModal } from '@ionic/angular/standalone';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent, CapacitorCalendar } from '../../../../../dist/esm';
import { EventsListComponent } from './events-list/events-list.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-events-action-modal',
  templateUrl: './events-action-modal.component.html',
  styleUrls: ['./events-action-modal.component.scss'],
  imports: [IonModal, EventsListComponent, LetDirective],
  standalone: true,
})
export class EventsActionModalComponent {
  @Output() deleteEvents = new EventEmitter<string>();
  @Output() modifyEvent = new EventEmitter<string>();
  @ViewChild('modal') modal?: IonModal;
  public loading = false;
  public readonly views: 'events-list' = 'events-list';
  readonly events$ = new BehaviorSubject<CalendarEvent[]>([]);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

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

  fetchEvents(startDate: number, endDate: number): Promise<void> {
    return CapacitorCalendar.listEventsInRange({
      startDate: startDate,
      endDate: endDate,
    })
      .then(({ result }) => this.events$.next(result))
      .catch((error) => console.warn(error));
  }
}
