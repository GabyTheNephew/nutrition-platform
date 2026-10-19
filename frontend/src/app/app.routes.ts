import { Routes } from '@angular/router';
import { FoodCatalogPageComponent } from './features/food-catalog/pages/food-catalog-page/food-catalog-page.component';
import { RecipeListPageComponent } from './features/meal-prep/pages/recipe-list-page.component/recipe-list-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'foods', pathMatch: 'full' },
  { path: 'foods', component: FoodCatalogPageComponent },
  { path: 'recipes', component: RecipeListPageComponent }
];