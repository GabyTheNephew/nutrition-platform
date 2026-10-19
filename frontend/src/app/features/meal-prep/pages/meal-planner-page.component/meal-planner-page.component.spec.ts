import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealPlannerPageComponent } from './meal-planner-page.component';

describe('MealPlannerPageComponent', () => {
  let component: MealPlannerPageComponent;
  let fixture: ComponentFixture<MealPlannerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlannerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MealPlannerPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
