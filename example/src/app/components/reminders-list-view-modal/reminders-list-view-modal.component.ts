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
  IonModal,
  IonProgressBar,
  IonRow,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BehaviorSubject } from 'rxjs';
import { Reminder, CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { DatePipe, DOCUMENT } from '@angular/common';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-reminders-list-view-modal',
  templateUrl: './reminders-list-view-modal.component.html',
  standalone: true,
  imports: [
    DatePipe,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonProgressBar,
    IonContent,
    IonGrid,
    LetDirective,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
  ],
})
export class RemindersListViewModalComponent {
  @Output() deleteReminders = new EventEmitter<string[]>();
  @ViewChild('modal') modal?: IonModal;
  public loading = false;
  public checkboxStates: { [key: string]: boolean } = {};
  readonly reminders$ = new BehaviorSubject<Reminder[]>([]);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  present(): Promise<void> {
    this.loading = true;
    if (this.modal) {
      void this.fetchReminders().finally(() => (this.loading = false));
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
    this.deleteReminders.emit(idsToDelete);
    void this.modal?.dismiss();
  }

  dispose(): void {
    this.checkboxStates = {};
  }

  private fetchReminders(): Promise<void> {
    return CapacitorCalendar.getRemindersFromLists()
      .then(({ result }) => this.reminders$.next(result))
      .catch((error) => console.warn(error));
  }
}
