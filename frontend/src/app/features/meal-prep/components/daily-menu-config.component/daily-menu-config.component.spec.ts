import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyMenuConfigComponent } from './daily-menu-config.component';

describe('DailyMenuConfigComponent', () => {
  let component: DailyMenuConfigComponent;
  let fixture: ComponentFixture<DailyMenuConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyMenuConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyMenuConfigComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
