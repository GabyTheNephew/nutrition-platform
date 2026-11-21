import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiRecipeGeneratorPageComponent } from './ai-recipe-generator-page.component';

describe('AiRecipeGeneratorPageComponent', () => {
  let component: AiRecipeGeneratorPageComponent;
  let fixture: ComponentFixture<AiRecipeGeneratorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiRecipeGeneratorPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiRecipeGeneratorPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
