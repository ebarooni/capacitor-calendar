import {Component, NgZone} from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPicker} from "@ionic/angular/standalone";
import {
  CalendarChooserDisplayStyle,
  CalendarChooserSelectionStyle,
  CapacitorCalendar
} from "@ebarooni/capacitor-calendar";
import {StoreService} from "../../store/store.service";
import {calendarChooserPickerColumns} from "../../ion-picker-data/calendar-chooser/calendar-chooser-picker-columns";
import {getCalendarChooserPickerButtons} from "../../ion-picker-data/calendar-chooser/calendar-chooser-picker-buttons";

@Component({
  selector: 'app-methods-list',
  templateUrl: './methods-list.component.html',
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPicker
  ],
  standalone: true
})
export class MethodsListComponent {
  public calendarChooserPickerColumns = calendarChooserPickerColumns;
  public calendarChooserPickerButtons = getCalendarChooserPickerButtons(
    (result: any) => this.zone.run(() => this.selectCalendarsWithPrompt(result.selectionStyle.value, result.displayStyle.value))
  );

  constructor(
    private readonly storeService: StoreService,
    private readonly zone: NgZone
  ) {}

  public createEventWithPrompt(): void {
    CapacitorCalendar.createEventWithPrompt()
      .then((response) => this.storeService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }

  public selectCalendarsWithPrompt(
    selectionStyle: CalendarChooserSelectionStyle,
    displayStyle: CalendarChooserDisplayStyle
  ): void {
    CapacitorCalendar.selectCalendarsWithPrompt({ selectionStyle: selectionStyle, displayStyle: displayStyle })
      .then((response) => this.storeService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }

  public checkAllPermissions(): void {
    CapacitorCalendar.checkAllPermissions()
      .then((response) => {
        this.storeService.updateState({ permissions: response });
        this.storeService.dispatchLog(JSON.stringify(response));
      })
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }

  public requestAllPermissions(): void {
    CapacitorCalendar.requestAllPermissions()
      .then((response) => {
        this.storeService.updateState({ permissions: response });
        this.storeService.dispatchLog(JSON.stringify(response));
      })
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }

  public listCalendars(): void {
    CapacitorCalendar.listCalendars()
      .then((response) => this.storeService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }

  public getDefaultCalendar(): void {
    CapacitorCalendar.getDefaultCalendar()
      .then((response) => this.storeService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }
}
