import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MealPlanApiService } from '../../services/meal-plan-api.service';
import { RecipeApiService } from '../../services/recipe-api.service';
import { Recipe } from '../../models/recipe.model';
import { MealPlan, MealPlanCreate, MealPlanItemCreate, MealType, ShoppingListResponse } from '../../models/meal-plan.model';
import { ShoppingListComponent } from '../../components/shopping-list.component/shopping-list.component';
import { SavedPlansListComponent } from '../../components/saved-plans-list.component/saved-plans-list.component';
import { extractErrorMessage } from '../../../../core/utils/error.util';

export interface DayCard {
  date: string;        // YYYY-MM-DD
  dayName: string;     // Luni, Marți etc.
  displayDate: string; // 21 Oct
}

@Component({
  selector: 'app-meal-planner-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingListComponent,
    SavedPlansListComponent
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

  weekStartMonday = signal<Date>(this.getMondayOfCurrentWeek());
  selectedDates = signal<string[]>([]);

  readonly todayIso = new Date().toISOString().split('T')[0];
  readonly currentWeekMonday = this.getMondayOfCurrentWeek();

  currentWeekDays = computed<DayCard[]>(() => {
    const monday = this.weekStartMonday();
    const days: DayCard[] = [];
    const dayNames = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

    for (let i = 0; i < 7; i++) {
      const current = new Date(monday);
      current.setDate(monday.getDate() + i);

      const isoDate = current.toISOString().split('T')[0];
      const dayName = dayNames[current.getDay()];
      const displayDate = `${current.getDate()} ${current.toLocaleString('ro-RO', { month: 'short' })}`;

      days.push({ date: isoDate, dayName, displayDate });
    }
    return days;
  });

  totalMealsCount = computed<number>(() => {
    const mealsChosen = Object.values(this.selectedMeals()).filter(id => !!id).length;
    const daysCount = this.selectedDates().length;
    return mealsChosen * daysCount;
  });

  ngOnInit(): void {
    this.loadInitialData();
    this.selectWorkdays();
  }

  canNavigateToPreviousWeek = computed<boolean>(() => {
    return this.weekStartMonday().getTime() > this.currentWeekMonday.getTime();
  });

  isPastDate(date: string): boolean {
    return date < this.todayIso;
  }



  private getMondayOfCurrentWeek(): Date {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
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

  onMealChange(type: MealType, event: Event): void {
    const recipeId = (event.target as HTMLSelectElement).value;
    this.selectedMeals.update(current => ({
      ...current,
      [type]: recipeId
    }));
  }

  previousWeek(): void {
    if (!this.canNavigateToPreviousWeek()) {
      return; // Oprește navigarea dacă suntem deja pe săptămâna curentă
    }

    const current = new Date(this.weekStartMonday());
    current.setDate(current.getDate() - 7);
    this.weekStartMonday.set(current);
  }

  nextWeek(): void {
    const current = new Date(this.weekStartMonday());
    current.setDate(current.getDate() + 7);
    this.weekStartMonday.set(current);
  }

  toggleDate(date: string): void {
    if (this.isPastDate(date)) {
      return;
    }

    this.selectedDates.update(dates => {
      if (dates.includes(date)) {
        return dates.filter(d => d !== date);
      } else {
        return [...dates, date];
      }
    });
  }

  isDateSelected(date: string): boolean {
    return this.selectedDates().includes(date);
  }

  selectWorkdays(): void {
    const days = this.currentWeekDays();
    const workdays = days
      .slice(0, 5)
      .map(d => d.date)
      .filter(date => !this.isPastDate(date));

    this.selectedDates.set(workdays);
  }

  selectAllWeek(): void {
    const days = this.currentWeekDays();
    const futureDays = days
      .map(d => d.date)
      .filter(date => !this.isPastDate(date));

    this.selectedDates.set(futureDays);
  }

  clearDates(): void {
    this.selectedDates.set([]);
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