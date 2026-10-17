package com.nutrition.meal_prep_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeDTO {
    private UUID id;
    private String name;
    private String instructions;
    private Integer servings;
    private Double totalCalories;
    private Double totalProtein;
    private Double totalCarbohydrates;
    private Double totalFat;
    private List<RecipeIngredientDTO> ingredients;
}