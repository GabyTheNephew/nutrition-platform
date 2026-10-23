import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodApiService } from '../../services/food-api.service';
import { FoodItem } from '../../models/food.model';
import { FoodCardComponent } from '../../components/food-card/food-card.component';
import { extractErrorMessage } from '../../../../core/utils/error.util';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type MacroFilterType = 'ALL' | 'PROTEIN' | 'CARBOHYDRATE' | 'FAT';

@Component({
  selector: 'app-food-catalog-page',
  standalone: true,
  imports: [CommonModule, FoodCardComponent],
  templateUrl: './food-catalog-page.component.html',
  styleUrl: './food-catalog-page.component.scss'
})
export class FoodCatalogPageComponent implements OnInit {
  private foodApiService = inject(FoodApiService);

  foods = signal<FoodItem[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  activeFilter = signal<MacroFilterType>('ALL');
  searchQuery = signal<string>('');

  private searchSubject = new Subject<string>();
  // private searchSubscription?: Subscription;

  constructor() {
    this.searchSubject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe((query) => {
      this.searchQuery.set(query);
      this.loadFoods();
    });
  }

  ngOnInit(): void {
    this.loadFoods();
  }

  loadFoods(): void {
    if (this.foods().length === 0) {
      this.isLoading.set(true);
    }
    this.errorMessage.set('');

    this.getFoodsRequest().subscribe({
      next: (data) => {
        const filter = this.activeFilter();
        const query = this.searchQuery().trim();

        const finalData = (query.length > 0 && filter !== 'ALL')
          ? data.filter(item => item.dominantMacro === filter)
          : data;

        this.foods.set(finalData);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(extractErrorMessage(err, 'Eroare la încărcarea catalogului.'));
      }
    });
  }

  private getFoodsRequest(): Observable<FoodItem[]> {
    const query = this.searchQuery().trim();
    const filter = this.activeFilter();

    if (query.length > 0) {
      return this.foodApiService.searchFoods(query);
    }

    if (filter !== 'ALL') {
      return this.foodApiService.getFoodsByDominantMacro(filter);
    }

    return this.foodApiService.getAllFoods();
  }

  onFilterChange(category: MacroFilterType): void {
    if (this.activeFilter() === category) return;
    this.activeFilter.set(category);
    this.loadFoods();
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  clearSearch(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.searchQuery.set('');
    this.searchSubject.next('');
  }
}