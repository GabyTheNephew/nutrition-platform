import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlan } from '../../models/meal-plan.model';

@Component({
  selector: 'app-saved-plans-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-plans-list.component.html',
  styleUrl: './saved-plans-list.component.scss'
})
export class SavedPlansListComponent {
  @Input({ required: true }) plans: MealPlan[] = [];

  @Output() viewShoppingList = new EventEmitter<string>();
  @Output() deletePlan = new EventEmitter<string>();

  onSelectShoppingList(planId: string): void {
    this.viewShoppingList.emit(planId);
  }

  onDelete(planId: string): void {
    this.deletePlan.emit(planId);
  }
}