import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { MealType } from '../../models/meal-plan.model';

export interface MealChangeEvent {
  type: MealType;
  recipeId: string;
}

@Component({
  selector: 'app-daily-menu-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-menu-config.component.html',
  styleUrl: './daily-menu-config.component.scss'
})
export class DailyMenuConfigComponent {
  @Input({ required: true }) recipes: Recipe[] = [];
  @Input({ required: true }) selectedMeals: Record<MealType, string> = {
    BREAKFAST: '',
    LUNCH: '',
    DINNER: '',
    SNACK: ''
  };

  @Output() mealChange = new EventEmitter<MealChangeEvent>();

  onSelectChange(type: MealType, event: Event): void {
    const recipeId = (event.target as HTMLSelectElement).value;
    this.mealChange.emit({ type, recipeId });
  }
}