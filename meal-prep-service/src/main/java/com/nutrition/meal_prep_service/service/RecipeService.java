package com.nutrition.meal_prep_service.service;

import com.nutrition.meal_prep_service.client.FoodCatalogClient;
import com.nutrition.meal_prep_service.dto.RecipeCreateDTO;
import com.nutrition.meal_prep_service.dto.RecipeIngredientCreateDTO;
import com.nutrition.meal_prep_service.dto.external.FoodItemDTO;
import com.nutrition.meal_prep_service.entity.Recipe;
import com.nutrition.meal_prep_service.entity.RecipeIngredient;
import com.nutrition.meal_prep_service.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final FoodCatalogClient foodCatalogClient;

    @Transactional
    public Recipe createRecipe(RecipeCreateDTO dto) {
        if (recipeRepository.existsByNameIgnoreCase(dto.getName())) {
            throw new RuntimeException("Rețeta cu acest nume există deja!");
        }

        Recipe recipe = Recipe.builder()
                .name(dto.getName())
                .instructions(dto.getInstructions())
                .servings(dto.getServings())
                .totalCalories(0.0)
                .totalProtein(0.0)
                .totalCarbohydrates(0.0)
                .totalFat(0.0)
                .build();

        for (RecipeIngredientCreateDTO ingDto : dto.getIngredients()) {
            FoodItemDTO food = foodCatalogClient.getFoodById(ingDto.getFoodItemId());

            double multiplier = ingDto.getQuantityGrams() / 100.0;

            recipe.setTotalCalories(recipe.getTotalCalories() + (food.getCalories() * multiplier));
            recipe.setTotalProtein(recipe.getTotalProtein() + (food.getProtein() * multiplier));
            recipe.setTotalCarbohydrates(recipe.getTotalCarbohydrates() + (food.getCarbohydrates() * multiplier));
            recipe.setTotalFat(recipe.getTotalFat() + (food.getFat() * multiplier));

            RecipeIngredient ingredient = RecipeIngredient.builder()
                    .foodItemId(food.getId())
                    .foodName(food.getName())
                    .quantityGrams(ingDto.getQuantityGrams())
                    .build();

            recipe.addIngredient(ingredient);
        }

        return recipeRepository.save(recipe);
    }
}