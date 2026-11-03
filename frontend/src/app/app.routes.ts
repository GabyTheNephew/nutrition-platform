import { Routes } from '@angular/router';
import { FoodCatalogPageComponent } from './features/food-catalog/pages/food-catalog-page/food-catalog-page.component';
import { RecipeListPageComponent } from './features/meal-prep/pages/recipe-list-page.component/recipe-list-page.component';
import { RecipeFormComponent } from './features/meal-prep/components/recipe-form.component/recipe-form.component';
import { MealPlannerPageComponent } from './features/meal-prep/pages/meal-planner-page.component/meal-planner-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'foods', pathMatch: 'full' },
  {
    path: 'foods',
    loadComponent: () => import('./features/food-catalog/pages/food-catalog-page/food-catalog-page.component').then(m => m.FoodCatalogPageComponent)
  },
  {
    path: 'recipes',
    loadComponent: () => import('./features/meal-prep/pages/recipe-list-page.component/recipe-list-page.component').then(m => m.RecipeListPageComponent)
  },
  {
    path: 'meal-planner',
    loadComponent: () => import('./features/meal-prep/pages/meal-planner-page.component/meal-planner-page.component').then(m => m.MealPlannerPageComponent)
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./features/user-profile/pages/onboarding-page.component/onboarding-page.component').then(m => m.OnboardingPageComponent)
  }
];