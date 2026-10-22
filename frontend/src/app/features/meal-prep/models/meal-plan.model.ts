export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

export interface MealPlanItemCreate {
  recipeId: string;
  mealType: MealType;
  consumeDate: string; // Format ISO: YYYY-MM-DD
  servings: number;
}

export interface MealPlanCreate {
  name: string;
  startDate: string; // Format ISO: YYYY-MM-DD
  endDate: string;
  items: MealPlanItemCreate[];
}

export interface MealPlanItem {
  id: string;
  recipeId: string;
  recipeName: string;
  mealType: MealType;
  consumeDate: string;
  servings: number;
}

export interface MealPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  items: MealPlanItem[];
}

export interface ShoppingListItem {
  foodItemId: string;
  foodName: string;
  totalQuantityGrams: number;
  estimatedItemCost: number | null;
}

export interface ShoppingListResponse {
  mealPlanId: string;
  mealPlanName: string;
  estimatedTotalCost: number;
  items: ShoppingListItem[];
}