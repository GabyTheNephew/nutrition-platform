import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GeneratedRecipeList,
  RecipeGenerationRequest,
  RecipeRefineRequest,
  RecipeRefineResponse
} from '../models/ai-recipe.model';

@Injectable({
  providedIn: 'root'
})
export class AiRecipeApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/ai';

  generateRecipes(request: RecipeGenerationRequest): Observable<GeneratedRecipeList> {
    return this.http.post<GeneratedRecipeList>(`${this.API_URL}/generate-recipes`, request);
  }

  refineRecipe(request: RecipeRefineRequest): Observable<RecipeRefineResponse> {
    return this.http.post<RecipeRefineResponse>(`${this.API_URL}/refine-recipe`, request);
  }
}