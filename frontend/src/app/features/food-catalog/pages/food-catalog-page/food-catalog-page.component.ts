import { Component, inject, OnInit, signal } from '@angular/core';
import { FoodApiService } from '../../services/food-api.service';
import { FoodItem } from '../../models/food.model';
import { FoodCardComponent } from '../../components/food-card/food-card.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FoodCardComponent],
  selector: 'app-food-catalog-page',
  styleUrl: './food-catalog-page.component.scss',
  templateUrl: './food-catalog-page.component.html',
})
export class FoodCatalogPageComponent implements OnInit {
  private foodApiService = inject(FoodApiService);

  foods = signal<FoodItem[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.foodApiService.getAllFoods().subscribe({
      next: (data) => {
        this.foods.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Nu am putut încărca catalogul de alimente.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }
}