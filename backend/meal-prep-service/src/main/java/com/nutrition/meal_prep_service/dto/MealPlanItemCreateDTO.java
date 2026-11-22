package com.nutrition.meal_prep_service.dto;

import com.nutrition.meal_prep_service.enums.MealType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealPlanItemCreateDTO {

    @NotNull(message = "Recipe ID is required.")
    private UUID recipeId;

    @NotNull(message = "Meal type is required.")
    private MealType mealType;

    @NotNull(message = "Meal date is required.")
    private LocalDate consumeDate;

    @Builder.Default
    private Integer servings = 1;
}