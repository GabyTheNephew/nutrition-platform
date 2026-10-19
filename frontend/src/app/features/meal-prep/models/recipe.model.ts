export interface RecipeIngredient {
  id: string;
  foodItemId: string;
  foodName: string;
  quantityGrams: number;
}

export interface Recipe {
  id: string;
  name: string;
  instructions: string;
  servings: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredientCreate {
  foodItemId: string;
  quantityGrams: number;
}

export interface RecipeCreate {
  name: string;
  instructions: string;
  servings: number;
  ingredients: RecipeIngredientCreate[];
}