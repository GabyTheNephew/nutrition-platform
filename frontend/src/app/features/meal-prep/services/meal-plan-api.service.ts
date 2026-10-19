import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  MealPlan, 
  MealPlanCreate, 
  ShoppingListResponse 
} from '../models/meal-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/meal-plans';

  getAllMealPlans(): Observable<MealPlan[]> {
    return this.http.get<MealPlan[]>(this.API_URL);
  }

  getMealPlanById(id: string): Observable<MealPlan> {
    return this.http.get<MealPlan>(`${this.API_URL}/${id}`);
  }

  createMealPlan(payload: MealPlanCreate): Observable<MealPlan> {
    return this.http.post<MealPlan>(this.API_URL, payload);
  }

  deleteMealPlan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getShoppingList(mealPlanId: string): Observable<ShoppingListResponse> {
    return this.http.get<ShoppingListResponse>(`${this.API_URL}/${mealPlanId}/shopping-list`);
  }
}