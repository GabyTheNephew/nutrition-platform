import { MealType } from '../../meal-prep/models/meal-plan.model';

export interface GeneratedIngredient {
  foodItemId: string;
  foodName: string;
  quantityGrams: number;
}

export interface GeneratedRecipe {
  name: string;
  instructions: string;
  servings: number;
  estimatedCalories: number;
  estimatedProtein: number;
  estimatedCarbs: number;
  estimatedFat: number;
  ingredients: GeneratedIngredient[];
}

export interface RecipeGenerationRequest {
  mealType: MealType;
  extraNotes?: string;
}

export interface GeneratedRecipeList {
  recipes: GeneratedRecipe[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface RecipeRefineRequest {
  currentRecipe: GeneratedRecipe;
  userMessage: string;
  conversationHistory: ChatMessage[];
}

export interface RecipeRefineResponse {
  assistantReply: string;
  updatedRecipe: GeneratedRecipe;
}