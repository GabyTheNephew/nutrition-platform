package com.nutrition.ai_recipe_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RecipeGenerationRequestDTO {
    @NotBlank(message = "Tipul mesei este obligatoriu (ex: BREAKFAST, LUNCH, DINNER, SNACK)")
    private String mealType;

    private String extraNotes;
}