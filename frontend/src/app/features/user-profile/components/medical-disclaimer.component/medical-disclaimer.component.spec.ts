import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalDisclaimerComponent } from './medical-disclaimer.component';

describe('MedicalDisclaimerComponent', () => {
  let component: MedicalDisclaimerComponent;
  let fixture: ComponentFixture<MedicalDisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalDisclaimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalDisclaimerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
