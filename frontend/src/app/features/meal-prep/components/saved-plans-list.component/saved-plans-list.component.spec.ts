import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedPlansListComponent } from './saved-plans-list.component';

describe('SavedPlansListComponent', () => {
  let component: SavedPlansListComponent;
  let fixture: ComponentFixture<SavedPlansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedPlansListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedPlansListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
