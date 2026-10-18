import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodCatalogPage } from './food-catalog-page';

describe('FoodCatalogPage', () => {
  let component: FoodCatalogPage;
  let fixture: ComponentFixture<FoodCatalogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCatalogPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodCatalogPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
