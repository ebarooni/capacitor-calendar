import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemindersListViewModalComponent } from './reminders-list-view-modal.component';

describe('RemindersListViewModalComponent', () => {
  let component: RemindersListViewModalComponent;
  let fixture: ComponentFixture<RemindersListViewModalComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [RemindersListViewModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RemindersListViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
