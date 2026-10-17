package com.nutrition.meal_prep_service.dto;

import com.nutrition.meal_prep_service.enums.MealType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealPlanItemDTO {
    private UUID id;
    private UUID recipeId;
    private String recipeName;
    private MealType mealType;
    private Integer plannedServings;
}