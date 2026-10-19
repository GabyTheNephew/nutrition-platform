import { TestBed } from '@angular/core/testing';
import { MealPlanApiService } from './meal-plan-api.service';

describe('MealPlanApiService', () => {
  let service: MealPlanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealPlanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
