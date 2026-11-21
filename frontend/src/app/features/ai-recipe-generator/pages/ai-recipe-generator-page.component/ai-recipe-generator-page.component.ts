import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AiRecipeApiService } from '../../services/ai-recipe-api.service';
import { ChatMessage, GeneratedRecipe } from '../../models/ai-recipe.model';
import { AiRecipeChatComponent } from '../../components/ai-recipe-chat.component/ai-recipe-chat.component';
import { MealType } from '../../../meal-prep/models/meal-plan.model';
import { RecipeCreate } from '../../../meal-prep/models/recipe.model';
import { RecipeApiService } from '../../../meal-prep/services/recipe-api.service';
import { extractErrorMessage } from '../../../../core/utils/error.util';

@Component({
  selector: 'app-ai-recipe-generator-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AiRecipeChatComponent],
  templateUrl: './ai-recipe-generator-page.component.html',
  styleUrl: './ai-recipe-generator-page.component.scss'
})
export class AiRecipeGeneratorPageComponent {
  private aiRecipeApi = inject(AiRecipeApiService);
  private recipeApi = inject(RecipeApiService);

  readonly mealTypes: { value: MealType; label: string }[] = [
    { value: 'BREAKFAST', label: 'Mic Dejun' },
    { value: 'LUNCH', label: 'Prânz' },
    { value: 'DINNER', label: 'Cină' },
    { value: 'SNACK', label: 'Gustare' }
  ];

  selectedMealType = signal<MealType>('LUNCH');
  extraNotes = signal<string>('');

  generatedRecipes = signal<GeneratedRecipe[]>([]);
  selectedIndex = signal<number | null>(null);
  chatHistory = signal<ChatMessage[]>([]);

  isGenerating = signal<boolean>(false);
  isRefining = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  selectedRecipe = computed<GeneratedRecipe | null>(() => {
    const idx = this.selectedIndex();
    const list = this.generatedRecipes();
    return idx !== null && list[idx] ? list[idx] : null;
  });

  onSelectMealType(type: MealType): void {
    this.selectedMealType.set(type);
  }

  onGenerate(): void {
    this.isGenerating.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.selectedIndex.set(null);
    this.chatHistory.set([]);

    this.aiRecipeApi.generateRecipes({
      mealType: this.selectedMealType(),
      extraNotes: this.extraNotes().trim() || undefined
    }).subscribe({
      next: (response) => {
        this.generatedRecipes.set(response.recipes ?? []);
        if (response.recipes?.length > 0) {
          this.selectedIndex.set(0);
        }
        this.isGenerating.set(false);
      },
      error: (err) => {
        this.isGenerating.set(false);
        this.errorMessage.set(extractErrorMessage(err, 'Nu s-au putut genera rețetele AI.'));
      }
    });
  }

  onSelectRecipe(index: number): void {
    if (this.selectedIndex() === index) {
      return;
    }
    this.selectedIndex.set(index);
    this.chatHistory.set([]);
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  onSendChatMessage(userMessage: string): void {
    const current = this.selectedRecipe();
    const idx = this.selectedIndex();
    if (!current || idx === null) {
      return;
    }

    this.isRefining.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const historySnapshot = this.chatHistory();
    this.chatHistory.update(msgs => [...msgs, { role: 'user', content: userMessage }]);

    this.aiRecipeApi.refineRecipe({
      currentRecipe: current,
      userMessage,
      conversationHistory: historySnapshot
    }).subscribe({
      next: (res) => {
        this.chatHistory.update(msgs => [
          ...msgs,
          { role: 'assistant', content: res.assistantReply }
        ]);

        if (res.updatedRecipe) {
          this.generatedRecipes.update(list =>
            list.map((item, i) => (i === idx ? res.updatedRecipe : item))
          );
        }
        this.isRefining.set(false);
      },
      error: (err) => {
        this.isRefining.set(false);
        this.chatHistory.set(historySnapshot);
        this.errorMessage.set(extractErrorMessage(err, 'Nu s-a putut procesa mesajul de rafinare.'));
      }
    });
  }

  onSaveRecipe(recipe: GeneratedRecipe): void {
    this.isSaving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload: RecipeCreate = {
      name: recipe.name,
      instructions: recipe.instructions,
      servings: recipe.servings,
      ingredients: recipe.ingredients.map(ing => ({
        foodItemId: ing.foodItemId,
        quantityGrams: ing.quantityGrams
      }))
    };

    this.recipeApi.createRecipe(payload).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.successMessage.set(`Rețeta „${recipe.name}” a fost salvată în Rețete Meal Prep!`);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(extractErrorMessage(err, 'Nu s-a putut salva rețeta în catalogul de rețete.'));
      }
    });
  }
}