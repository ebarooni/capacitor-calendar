import {Component, NgZone} from '@angular/core';
import {IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPicker} from "@ionic/angular/standalone";
import {
  CalendarChooserDisplayStyle,
  CalendarChooserSelectionStyle,
  CapacitorCalendar
} from "@ebarooni/capacitor-calendar";
import {StoreService} from "../../store/store.service";

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
  public calendarChooserPickerColumns = [
    {
      name: 'selectionStyle',
      options: [
        {
          text: 'Single',
          value: CalendarChooserSelectionStyle.SINGLE,
        },
        {
          text: 'Multiple',
          value: CalendarChooserSelectionStyle.MULTIPLE,
        },
      ],
    },
    {
      name: 'displayStyle',
      options: [
        {
          text: 'All Calendars',
          value: CalendarChooserDisplayStyle.ALL_CALENDARS,
        },
        {
          text: 'Writable Calendars Only',
          value: CalendarChooserDisplayStyle.WRITABLE_CALENDARS_ONLY,
        },
      ],
    },
  ];
  public calendarChooserPickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (result: any) => this.zone.run(() => this.selectCalendarsWithPrompt(result.selectionStyle.value, result.displayStyle.value)),
    },
  ];

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
      .then((response) => this.storeService.dispatchLog(JSON.stringify(response)))
      .catch((error) => this.storeService.dispatchLog(JSON.stringify(error)));
  }
}
