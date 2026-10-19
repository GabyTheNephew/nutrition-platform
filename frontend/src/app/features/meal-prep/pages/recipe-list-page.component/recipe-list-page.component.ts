import { Component, OnInit, inject, signal } from '@angular/core'; // <-- adaugă 'signal'
import { CommonModule } from '@angular/common';
import { RecipeApiService } from '../../services/recipe-api.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../../components/recipe-card.component/recipe-card.component';
import { RouterLink } from '@angular/router';

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
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Nu am putut încărca rețetele de la server.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }
}