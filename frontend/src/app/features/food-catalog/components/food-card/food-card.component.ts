import { Component, Input } from '@angular/core';
import { FoodItem } from '../../models/food.model';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-food-card',
  styleUrl: './food-card.component.scss',
  templateUrl: './food-card.component.html',
})
export class FoodCardComponent {
  @Input({ required: true }) food!: FoodItem;
}