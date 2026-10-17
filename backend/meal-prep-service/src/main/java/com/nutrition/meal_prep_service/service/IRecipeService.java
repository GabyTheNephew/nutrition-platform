package com.nutrition.meal_prep_service.service;

import com.nutrition.meal_prep_service.dto.RecipeCreateDTO;
import com.nutrition.meal_prep_service.dto.RecipeDTO;

import java.util.List;
import java.util.UUID;

public interface IRecipeService {
    RecipeDTO createRecipe(RecipeCreateDTO dto);
    List<RecipeDTO> getAllRecipes();
    RecipeDTO getRecipeById(UUID id);
    void deleteRecipe(UUID id);
}