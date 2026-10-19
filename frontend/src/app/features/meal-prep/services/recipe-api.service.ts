import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeCreate } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/recipes';

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.API_URL);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API_URL}/${id}`);
  }

  createRecipe(recipe: RecipeCreate): Observable<Recipe> {
    return this.http.post<Recipe>(this.API_URL, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}