import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, concat, of } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';
import { FoodItem } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/foods';

  private cachedFoods: FoodItem[] | null = null;
  private lastFetchedTime: number = 0;
  private readonly STALE_TIME_MS = 5 * 60 * 1000;

  private inFlight$: Observable<FoodItem[]> | null = null;

  getAllFoods(forceRefresh = false): Observable<FoodItem[]> {
    const now = Date.now();
    const isFresh = this.cachedFoods !== null && (now - this.lastFetchedTime < this.STALE_TIME_MS);

    if (isFresh && !forceRefresh) {
      return of(this.cachedFoods!);
    }

    if (!this.inFlight$) {
      this.inFlight$ = this.http.get<FoodItem[]>(this.API_URL).pipe(
        tap((data) => {
          this.cachedFoods = data;
          this.lastFetchedTime = Date.now();
        }),
        finalize(() => {
          this.inFlight$ = null;
        }),
        shareReplay(1)
      );
    }

    if (this.cachedFoods !== null && !forceRefresh) {
      return concat(of(this.cachedFoods), this.inFlight$);
    }

    return this.inFlight$;
  }

  searchFoods(query: string): Observable<FoodItem[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<FoodItem[]>(`${this.API_URL}/search`, { params });
  }

  getFoodsByDominantMacro(macro: string): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.API_URL}/dominant/${macro}`);
  }

  invalidateCache(): void {
    this.cachedFoods = null;
    this.lastFetchedTime = 0;
    this.inFlight$ = null;
  }
}