import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekDayPickerComponent } from './week-day-picker.component';

describe('WeekDayPickerComponent', () => {
  let component: WeekDayPickerComponent;
  let fixture: ComponentFixture<WeekDayPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekDayPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekDayPickerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
