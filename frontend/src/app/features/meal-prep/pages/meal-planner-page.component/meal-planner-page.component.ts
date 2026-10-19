import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealPlanApiService } from '../../services/meal-plan-api.service';
import { RecipeApiService } from '../../services/recipe-api.service';
import { Recipe } from '../../models/recipe.model';
import { MealPlan, MealPlanCreate, ShoppingListResponse } from '../../models/meal-plan.model';
import { ShoppingListComponent } from '../../components/shopping-list.component/shopping-list.component';
import { SavedPlansListComponent } from '../../components/saved-plans-list.component/saved-plans-list.component';

@Component({
  selector: 'app-meal-planner-page',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ShoppingListComponent, 
    SavedPlansListComponent
  ],
  templateUrl: './meal-planner-page.component.html',
  styleUrl: './meal-planner-page.component.scss'
})
export class MealPlannerPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private mealPlanApi = inject(MealPlanApiService);
  private recipeApi = inject(RecipeApiService);

  availableRecipes = signal<Recipe[]>([]);
  savedPlans = signal<MealPlan[]>([]);
  currentShoppingList = signal<ShoppingListResponse | null>(null);

  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');

  planForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    items: this.fb.array([])
  });

  get items(): FormArray {
    return this.planForm.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading.set(true);

    this.recipeApi.getAllRecipes().subscribe({
      next: (recipes) => {
        this.availableRecipes.set(recipes);
        this.addItem();
      },
      error: () => this.errorMessage.set('Nu s-au putut încărca rețetele.')
    });

    this.mealPlanApi.getAllMealPlans().subscribe({
      next: (plans) => {
        this.savedPlans.set(plans);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      recipeId: ['', Validators.required],
      mealType: ['LUNCH', Validators.required],
      plannedServings: [2, [Validators.required, Validators.min(1)]]
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onSubmitPlan(): void {
    if (this.planForm.invalid) {
      this.planForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const payload: MealPlanCreate = this.planForm.value;

    this.mealPlanApi.createMealPlan(payload).subscribe({
      next: (createdPlan) => {
        this.isSubmitting.set(false);
        this.savedPlans.update(plans => [createdPlan, ...plans]);
        this.planForm.reset({
          name: '',
          startDate: '',
          endDate: ''
        });
        this.items.clear();
        this.addItem();

        this.onViewShoppingList(createdPlan.id);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Eroare la crearea planului săptămânal.');
      }
    });
  }

  onViewShoppingList(planId: string): void {
    this.mealPlanApi.getShoppingList(planId).subscribe({
      next: (list) => {
        this.currentShoppingList.set(list);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Nu s-a putut genera lista de cumpărături.');
      }
    });
  }

  onDeletePlan(planId: string): void {
    if (!confirm('Ești sigur că vrei să ștergi acest plan săptămânal?')) {
      return;
    }

    this.mealPlanApi.deleteMealPlan(planId).subscribe({
      next: () => {
        this.savedPlans.update(plans => plans.filter(p => p.id !== planId));
        if (this.currentShoppingList()?.mealPlanId === planId) {
          this.currentShoppingList.set(null);
        }
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Nu s-a putut șterge planul săptămânal.');
      }
    });
  }
}