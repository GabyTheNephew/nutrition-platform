import { Component, OnInit, inject, signal } from '@angular/core'; // <-- adaugă 'signal'
import { CommonModule } from '@angular/common';
import { RecipeApiService } from '../../services/recipe-api.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../../components/recipe-card.component/recipe-card.component';
import { RouterLink } from '@angular/router';
import { extractErrorMessage } from '../../../../core/utils/error.util';

@Component({
  selector: 'app-recipe-list-page',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, RouterLink],
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss'
})
export class RecipeListPageComponent implements OnInit {
  private recipeService = inject(RecipeApiService);

  recipes = signal<Recipe[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    if (this.recipes.length === 0) {
      this.isLoading.set(true);
    }

    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Eroare la încărcarea rețetelor:', err);
        this.errorMessage.set(extractErrorMessage(err, 'Nu am putut încărca rețetele de la server.'));
      }
    });
  }
}