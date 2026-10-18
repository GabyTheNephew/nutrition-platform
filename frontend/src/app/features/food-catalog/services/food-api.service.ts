import { Service } from '@angular/core';

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}