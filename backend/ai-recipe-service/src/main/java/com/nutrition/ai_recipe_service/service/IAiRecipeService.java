package com.nutrition.ai_recipe_service.service;

import com.nutrition.ai_recipe_service.dto.GeneratedRecipeListDTO;
import com.nutrition.ai_recipe_service.dto.RecipeGenerationRequestDTO;
import com.nutrition.ai_recipe_service.dto.RecipeRefineRequestDTO;
import com.nutrition.ai_recipe_service.dto.RecipeRefineResponseDTO;

public interface IAiRecipeService {
    GeneratedRecipeListDTO generateRecipesForUser(RecipeGenerationRequestDTO request);
    RecipeRefineResponseDTO refineRecipe(RecipeRefineRequestDTO request);
}