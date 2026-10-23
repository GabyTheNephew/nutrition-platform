import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, concat, of } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';
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

  private cachedPlans: MealPlan[] | null = null;
  private lastFetchedTime: number = 0;
  private readonly STALE_TIME_MS = 60 * 1000;

  private inFlight$: Observable<MealPlan[]> | null = null;

  getAllMealPlans(forceRefresh = false): Observable<MealPlan[]> {
    const now = Date.now();
    const isFresh = this.cachedPlans !== null && (now - this.lastFetchedTime < this.STALE_TIME_MS);
    if (isFresh && !forceRefresh) {
      return of(this.cachedPlans!);
    }

    if (!this.inFlight$) {
      this.inFlight$ = this.http.get<MealPlan[]>(this.API_URL).pipe(
        tap((plans) => {
          this.cachedPlans = plans;
          this.lastFetchedTime = Date.now();
        }),
        finalize(() => {
          this.inFlight$ = null;
        }),
        shareReplay(1)
      );
    }

    if (this.cachedPlans !== null && !forceRefresh) {
      return concat(of(this.cachedPlans), this.inFlight$);
    }

    return this.inFlight$;
  }

  getMealPlanById(id: string): Observable<MealPlan> {
    if (this.cachedPlans) {
      const found = this.cachedPlans.find((p) => p.id === id);
      if (found) {
        return of(found);
      }
    }
    return this.http.get<MealPlan>(`${this.API_URL}/${id}`);
  }

  createMealPlan(payload: MealPlanCreate): Observable<MealPlan> {
    return this.http.post<MealPlan>(this.API_URL, payload).pipe(
      tap((newPlan) => {
        if (this.cachedPlans) {
          this.cachedPlans = [newPlan, ...this.cachedPlans];
          this.lastFetchedTime = Date.now();
        }
      })
    );
  }

  deleteMealPlan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        if (this.cachedPlans) {
          this.cachedPlans = this.cachedPlans.filter((p) => p.id !== id);
          this.lastFetchedTime = Date.now();
        }
      })
    );
  }

  getShoppingList(mealPlanId: string): Observable<ShoppingListResponse> {
    return this.http.get<ShoppingListResponse>(`${this.API_URL}/${mealPlanId}/shopping-list`);
  }

  invalidateCache(): void {
    this.cachedPlans = null;
    this.lastFetchedTime = 0;
    this.inFlight$ = null;
  }
}