package com.nutrition.ai_recipe_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedRecipeDTO {
    private String name;
    private String instructions;
    private Integer servings;
    private Double estimatedCalories;
    private Double estimatedProtein;
    private Double estimatedCarbs;
    private Double estimatedFat;
    private List<GeneratedIngredientDTO> ingredients;
}