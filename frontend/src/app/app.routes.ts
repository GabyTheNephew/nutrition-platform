import { Routes } from '@angular/router';
import { FoodCatalogPageComponent } from './features/food-catalog/pages/food-catalog-page/food-catalog-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'foods', pathMatch: 'full' },
  { path: 'foods', component: FoodCatalogPageComponent }
];