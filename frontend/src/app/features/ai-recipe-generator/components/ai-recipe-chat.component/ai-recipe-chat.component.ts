import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/ai-recipe.model';

@Component({
  selector: 'app-ai-recipe-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-recipe-chat.component.html',
  styleUrl: './ai-recipe-chat.component.scss'
})
export class AiRecipeChatComponent {
  @Input({ required: true }) recipeName = '';
  @Input({ required: true }) messages: ChatMessage[] = [];
  @Input() isSending = false;

  @Output() sendMessage = new EventEmitter<string>();

  draftMessage = '';

  onSubmit(): void {
    const trimmed = this.draftMessage.trim();
    if (!trimmed || this.isSending) {
      return;
    }
    this.sendMessage.emit(trimmed);
    this.draftMessage = '';
  }
}