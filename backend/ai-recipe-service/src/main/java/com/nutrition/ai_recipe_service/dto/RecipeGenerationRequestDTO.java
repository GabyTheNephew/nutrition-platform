package com.nutrition.ai_recipe_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RecipeGenerationRequestDTO {
    @NotBlank(message = "Meal type is required (e.g., BREAKFAST, LUNCH, DINNER, SNACK).")
    private String mealType;

    @Size(max = 300, message = "Extra notes cannot exceed 300 characters.")
    private String extraNotes;
}