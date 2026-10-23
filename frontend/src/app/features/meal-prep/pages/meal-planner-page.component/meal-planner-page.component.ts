import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealPlanApiService } from '../../services/meal-plan-api.service';
import { RecipeApiService } from '../../services/recipe-api.service';
import { Recipe } from '../../models/recipe.model';
import { MealPlan, MealPlanCreate, MealPlanItemCreate, MealType, ShoppingListResponse } from '../../models/meal-plan.model';
import { ShoppingListComponent } from '../../components/shopping-list.component/shopping-list.component';
import { SavedPlansListComponent } from '../../components/saved-plans-list.component/saved-plans-list.component';
import { WeekDayPickerComponent } from '../../components/week-day-picker.component/week-day-picker.component';
import { DailyMenuConfigComponent, MealChangeEvent } from '../../components/daily-menu-config.component/daily-menu-config.component'; // <-- Import nou
import { extractErrorMessage } from '../../../../core/utils/error.util';

@Component({
  selector: 'app-meal-planner-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListComponent,
    SavedPlansListComponent,
    WeekDayPickerComponent,
    DailyMenuConfigComponent
  ],
  templateUrl: './meal-planner-page.component.html',
  styleUrl: './meal-planner-page.component.scss'
})
export class MealPlannerPageComponent implements OnInit {
  private mealPlanApi = inject(MealPlanApiService);
  private recipeApi = inject(RecipeApiService);

  availableRecipes = signal<Recipe[]>([]);
  savedPlans = signal<MealPlan[]>([]);
  currentShoppingList = signal<ShoppingListResponse | null>(null);

  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');

  planName = signal<string>('Meal Prep Săptămânal');

  selectedMeals = signal<Record<MealType, string>>({
    BREAKFAST: '',
    LUNCH: '',
    DINNER: '',
    SNACK: ''
  });

  selectedDates = signal<string[]>([]);

  totalMealsCount = computed<number>(() => {
    const mealsChosen = Object.values(this.selectedMeals()).filter(id => !!id).length;
    const daysCount = this.selectedDates().length;
    return mealsChosen * daysCount;
  });

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading.set(true);

    this.recipeApi.getAllRecipes().subscribe({
      next: (recipes) => this.availableRecipes.set(recipes),
      error: (err) => this.errorMessage.set(extractErrorMessage(err, 'Nu s-au putut încărca rețetele.'))
    });

    this.mealPlanApi.getAllMealPlans().subscribe({
      next: (plans) => {
        this.savedPlans.set(plans);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(extractErrorMessage(err, 'Nu s-au putut încărca planurile existente.'));
      }
    });
  }

  onMealChange(event: MealChangeEvent): void {
    this.selectedMeals.update(current => ({
      ...current,
      [event.type]: event.recipeId
    }));
  }

  onDatesChange(dates: string[]): void {
    this.selectedDates.set(dates);
  }

  onSubmitPlan(): void {
    const meals = this.selectedMeals();
    const activeMeals = (Object.entries(meals) as [MealType, string][])
      .filter(([_, recipeId]) => !!recipeId);

    if (activeMeals.length === 0) {
      this.errorMessage.set('Selectează cel puțin o rețetă în meniul zilnic (Pasul 2).');
      return;
    }

    const dates = [...this.selectedDates()].sort();
    if (dates.length === 0) {
      this.errorMessage.set('Alege cel puțin o zi din calendar în care vei consuma aceste mese (Pasul 3).');
      return;
    }

    const items: MealPlanItemCreate[] = [];
    for (const date of dates) {
      for (const [mealType, recipeId] of activeMeals) {
        items.push({
          recipeId,
          mealType,
          consumeDate: date,
          servings: 1
        });
      }
    }

    const payload: MealPlanCreate = {
      name: this.planName().trim() || 'Meal Prep Săptămânal',
      startDate: dates[0],
      endDate: dates[dates.length - 1],
      items
    };

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.mealPlanApi.createMealPlan(payload).subscribe({
      next: (createdPlan) => {
        this.isSubmitting.set(false);
        this.savedPlans.update(plans => [createdPlan, ...plans]);
        this.onViewShoppingList(createdPlan.id);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(extractErrorMessage(err, 'Eroare la crearea planului.'));
      }
    });
  }

  onViewShoppingList(planId: string): void {
    this.mealPlanApi.getShoppingList(planId).subscribe({
      next: (list) => this.currentShoppingList.set(list),
      error: (err) => this.errorMessage.set(extractErrorMessage(err, 'Nu s-a putut genera lista de cumpărături.'))
    });
  }

  onDeletePlan(planId: string): void {
    if (!confirm('Ești sigur că vrei să ștergi acest plan?')) return;

    this.mealPlanApi.deleteMealPlan(planId).subscribe({
      next: () => {
        this.savedPlans.update(plans => plans.filter(p => p.id !== planId));
        if (this.currentShoppingList()?.mealPlanId === planId) {
          this.currentShoppingList.set(null);
        }
      },
      error: (err) => this.errorMessage.set(extractErrorMessage(err, 'Nu s-a putut șterge planul.'))
    });
  }
}