import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecipeApiService } from '../../services/recipe-api.service';
import { FoodApiService } from '../../../food-catalog/services/food-api.service';
import { FoodItem } from '../../../food-catalog/models/food.model';
import { RecipeCreate } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private recipeApiService = inject(RecipeApiService);
  private foodApiService = inject(FoodApiService);
  private router = inject(Router);

  availableFoods = signal<FoodItem[]>([]);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');

  recipeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    instructions: ['', Validators.required],
    servings: [1, [Validators.required, Validators.min(1)]],
    ingredients: this.fb.array([])
  });

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    this.foodApiService.getAllFoods().subscribe({
      next: (foods) => {
        this.availableFoods.set(foods);
        this.addIngredient();
      },
      error: () => this.errorMessage.set('Nu s-au putut încărca alimentele pentru dropdown.')
    });
  }

  addIngredient(): void {
    const ingredientGroup = this.fb.group({
      foodItemId: ['', Validators.required],
      quantityGrams: [100, [Validators.required, Validators.min(1)]]
    });
    this.ingredients.push(ingredientGroup);
  }

  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const payload: RecipeCreate = this.recipeForm.value;

    this.recipeApiService.createRecipe(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Eroare la salvarea rețetei.');
      }
    });
  }
}