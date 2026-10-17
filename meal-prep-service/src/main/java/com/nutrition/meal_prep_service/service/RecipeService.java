package com.nutrition.meal_prep_service.service;

import com.nutrition.meal_prep_service.client.FoodCatalogClient;
import com.nutrition.meal_prep_service.dto.RecipeCreateDTO;
import com.nutrition.meal_prep_service.dto.RecipeDTO;
import com.nutrition.meal_prep_service.dto.RecipeIngredientCreateDTO;
import com.nutrition.meal_prep_service.dto.external.FoodItemDTO;
import com.nutrition.meal_prep_service.entity.Recipe;
import com.nutrition.meal_prep_service.entity.RecipeIngredient;
import com.nutrition.meal_prep_service.exception.BusinessException;
import com.nutrition.meal_prep_service.exception.ResourceNotFoundException;
import com.nutrition.meal_prep_service.mapper.RecipeMapper;
import com.nutrition.meal_prep_service.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecipeService implements IRecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeMapper recipeMapper;
    private final FoodCatalogClient foodCatalogClient;

    @Override
    @Transactional
    public RecipeDTO createRecipe(RecipeCreateDTO dto) {
        if (recipeRepository.existsByNameIgnoreCase(dto.getName())) {
            throw new BusinessException("Rețeta cu numele '" + dto.getName() + "' există deja.");
        }

        Recipe recipe = Recipe.builder()
                .name(dto.getName())
                .instructions(dto.getInstructions())
                .servings(dto.getServings())
                .totalCalories(0.0)
                .totalProtein(0.0)
                .totalCarbohydrates(0.0)
                .totalFat(0.0)
                .build();

        for (RecipeIngredientCreateDTO ingDto : dto.getIngredients()) {
            FoodItemDTO food = foodCatalogClient.getFoodById(ingDto.getFoodItemId());

            double multiplier = ingDto.getQuantityGrams() / 100.0;

            recipe.setTotalCalories(recipe.getTotalCalories() + (food.getCalories() * multiplier));
            recipe.setTotalProtein(recipe.getTotalProtein() + (food.getProtein() * multiplier));
            recipe.setTotalCarbohydrates(recipe.getTotalCarbohydrates() + (food.getCarbohydrates() * multiplier));
            recipe.setTotalFat(recipe.getTotalFat() + (food.getFat() * multiplier));

            RecipeIngredient ingredient = RecipeIngredient.builder()
                    .foodItemId(food.getId())
                    .foodName(food.getName())
                    .quantityGrams(ingDto.getQuantityGrams())
                    .build();

            recipe.addIngredient(ingredient);
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        return recipeMapper.toDTO(savedRecipe);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecipeDTO> getAllRecipes() {
        return recipeRepository.findAll().stream()
                .map(recipeMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public RecipeDTO getRecipeById(UUID id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rețeta cu ID-ul " + id + " nu a fost găsită."));
        return recipeMapper.toDTO(recipe);
    }

    @Override
    @Transactional
    public void deleteRecipe(UUID id) {
        if (!recipeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Rețeta cu ID-ul " + id + " nu a fost găsită.");
        }
        recipeRepository.deleteById(id);
    }
}