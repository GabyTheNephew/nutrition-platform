package com.nutrition.ai_recipe_service.controller;

import com.nutrition.ai_recipe_service.dto.GeneratedRecipeListDTO;
import com.nutrition.ai_recipe_service.dto.RecipeGenerationRequestDTO;
import com.nutrition.ai_recipe_service.dto.RecipeRefineRequestDTO;
import com.nutrition.ai_recipe_service.dto.RecipeRefineResponseDTO;
import com.nutrition.ai_recipe_service.service.IAiRecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiRecipeController {

    private final IAiRecipeService aiRecipeService;

    @PostMapping("/generate-recipes")
    public ResponseEntity<GeneratedRecipeListDTO> generateRecipes(
            @Valid @RequestBody RecipeGenerationRequestDTO request) {
        return ResponseEntity.ok(aiRecipeService.generateRecipesForUser(request));
    }

    @PostMapping("/refine-recipe")
    public ResponseEntity<RecipeRefineResponseDTO> refineRecipe(
            @Valid @RequestBody RecipeRefineRequestDTO request) {
        return ResponseEntity.ok(aiRecipeService.refineRecipe(request));
    }
}