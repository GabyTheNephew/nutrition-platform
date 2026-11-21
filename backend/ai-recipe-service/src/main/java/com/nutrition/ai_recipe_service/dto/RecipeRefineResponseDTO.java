package com.nutrition.ai_recipe_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRefineResponseDTO {
    private String assistantReply;
    private GeneratedRecipeDTO updatedRecipe;
}