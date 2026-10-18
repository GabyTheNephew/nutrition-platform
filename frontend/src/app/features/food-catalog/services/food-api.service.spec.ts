import { TestBed } from '@angular/core/testing';
import { FoodApi } from './food-api';

describe('FoodApi', () => {
  let service: FoodApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
