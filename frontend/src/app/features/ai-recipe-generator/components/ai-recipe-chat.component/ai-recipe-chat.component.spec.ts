import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiRecipeChatComponent } from './ai-recipe-chat.component';

describe('AiRecipeChatComponent', () => {
  let component: AiRecipeChatComponent;
  let fixture: ComponentFixture<AiRecipeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiRecipeChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiRecipeChatComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
