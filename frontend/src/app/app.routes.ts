import { Routes } from '@angular/router';
import { FoodCatalogPageComponent } from './features/food-catalog/pages/food-catalog-page/food-catalog-page.component';
import { RecipeListPageComponent } from './features/meal-prep/pages/recipe-list-page.component/recipe-list-page.component';
import { RecipeFormComponent } from './features/meal-prep/components/recipe-form.component/recipe-form.component';
import { MealPlannerPageComponent } from './features/meal-prep/pages/meal-planner-page.component/meal-planner-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'foods', pathMatch: 'full' },
  { path: 'foods', component: FoodCatalogPageComponent },
  { path: 'recipes', component: RecipeListPageComponent },
  { path: 'recipes/new', component: RecipeFormComponent },
  { path: 'meal-planner', component: MealPlannerPageComponent }
];