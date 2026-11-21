import { TestBed } from '@angular/core/testing';
import { AiRecipeApiService } from './ai-recipe-api.service';

describe('AiRecipeApiService', () => {
  let service: AiRecipeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiRecipeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
