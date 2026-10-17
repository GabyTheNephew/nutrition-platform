package com.nutrition.meal_prep_service.mapper;

import com.nutrition.meal_prep_service.dto.RecipeDTO;
import com.nutrition.meal_prep_service.dto.RecipeIngredientDTO;
import com.nutrition.meal_prep_service.entity.Recipe;
import com.nutrition.meal_prep_service.entity.RecipeIngredient;
import org.springframework.stereotype.Component;

@Component
public class RecipeMapper {

    public RecipeDTO toDTO(Recipe entity) {
        if (entity == null) return null;

        return RecipeDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .instructions(entity.getInstructions())
                .servings(entity.getServings())
                .totalCalories(entity.getTotalCalories())
                .totalProtein(entity.getTotalProtein())
                .totalCarbohydrates(entity.getTotalCarbohydrates())
                .totalFat(entity.getTotalFat())
                .ingredients(entity.getIngredients().stream()
                        .map(this::toIngredientDTO)
                        .toList())
                .build();
    }

    public RecipeIngredientDTO toIngredientDTO(RecipeIngredient ingredient) {
        if (ingredient == null) return null;

        return RecipeIngredientDTO.builder()
                .id(ingredient.getId())
                .foodItemId(ingredient.getFoodItemId())
                .foodName(ingredient.getFoodName())
                .quantityGrams(ingredient.getQuantityGrams())
                .build();
    }
}