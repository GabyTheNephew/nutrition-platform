import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, concat, of } from 'rxjs';
import { finalize, shareReplay, tap } from 'rxjs/operators';
import { Recipe, RecipeCreate } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/recipes';

  private cachedRecipes: Recipe[] | null = null;
  private lastFetchedTime: number = 0;
  private readonly STALE_TIME_MS = 60 * 1000;

  private inFlight$: Observable<Recipe[]> | null = null;

  getAllRecipes(forceRefresh = false): Observable<Recipe[]> {
    const now = Date.now();
    const isFresh = this.cachedRecipes !== null && (now - this.lastFetchedTime < this.STALE_TIME_MS);

    if (isFresh && !forceRefresh) {
      return of(this.cachedRecipes!);
    }

    if (!this.inFlight$) {
      this.inFlight$ = this.http.get<Recipe[]>(this.API_URL).pipe(
        tap((recipes) => {
          this.cachedRecipes = recipes;
          this.lastFetchedTime = Date.now();
        }),
        finalize(() => {
          this.inFlight$ = null;
        }),
        shareReplay(1)
      );
    }

    if (this.cachedRecipes !== null && !forceRefresh) {
      return concat(of(this.cachedRecipes), this.inFlight$);
    }

    return this.inFlight$;
  }

  getRecipeById(id: string): Observable<Recipe> {
    if (this.cachedRecipes) {
      const found = this.cachedRecipes.find((r) => r.id === id);
      if (found) {
        return of(found);
      }
    }
    return this.http.get<Recipe>(`${this.API_URL}/${id}`);
  }

  createRecipe(recipe: RecipeCreate): Observable<Recipe> {
    return this.http.post<Recipe>(this.API_URL, recipe).pipe(
      tap((newRecipe) => {
        if (this.cachedRecipes) {
          this.cachedRecipes = [...this.cachedRecipes, newRecipe];
          this.lastFetchedTime = Date.now();
        }
      })
    );
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        if (this.cachedRecipes) {
          this.cachedRecipes = this.cachedRecipes.filter((r) => r.id !== id);
          this.lastFetchedTime = Date.now();
        }
      })
    );
  }

  invalidateCache(): void {
    this.cachedRecipes = null;
    this.lastFetchedTime = 0;
    this.inFlight$ = null;
  }
}