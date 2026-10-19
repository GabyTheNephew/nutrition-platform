import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListPageComponent } from './recipe-list-page.component';

describe('RecipeListPageComponent', () => {
  let component: RecipeListPageComponent;
  let fixture: ComponentFixture<RecipeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeListPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
