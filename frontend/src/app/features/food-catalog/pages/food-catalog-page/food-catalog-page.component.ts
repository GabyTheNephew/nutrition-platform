import { Component, inject, OnInit, signal } from '@angular/core';
import { FoodApiService } from '../../services/food-api.service';
import { FoodItem } from '../../models/food.model';
import { FoodCardComponent } from '../../components/food-card/food-card.component';

@Component({
  standalone: true,
  imports: [FoodCardComponent],
  selector: 'app-food-catalog-page',
  styleUrl: './food-catalog-page.component.scss',
  templateUrl: './food-catalog-page.component.html',
})
export class FoodCatalogPageComponent implements OnInit {
  private foodApiService = inject(FoodApiService);

  foods = signal<FoodItem[]>([]);

  ngOnInit(): void {
    this.foodApiService.getAllFoods().subscribe({
      next: (data) => {
        this.foods.set(data);
      },
      error: (err) => {
        console.error('Eroare la preluarea alimentelor:', err);
      }
    });
  }
}