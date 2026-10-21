import { Service } from '@angular/core';

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodApiService {
  private http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:8080/api/foods';

  getAllFoods(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.API_URL);
  }

  searchFoods(query: string): Observable<FoodItem[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<FoodItem[]>(`${this.API_URL}/search`, { params });
  }

  getFoodsByDominantMacro(macro: string): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.API_URL}/dominant/${macro}`);
  }
}