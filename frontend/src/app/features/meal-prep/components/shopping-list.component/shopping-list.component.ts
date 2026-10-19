import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListResponse } from '../../models/meal-plan.model';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {
  @Input({ required: true }) shoppingList!: ShoppingListResponse;
}