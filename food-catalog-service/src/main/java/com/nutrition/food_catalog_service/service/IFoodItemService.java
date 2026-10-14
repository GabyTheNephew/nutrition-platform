package com.nutrition.food_catalog_service.service;

import com.nutrition.food_catalog_service.dto.FoodItemCreateDTO;
import com.nutrition.food_catalog_service.dto.FoodItemDTO;
import com.nutrition.food_catalog_service.dto.FoodItemUpdateDTO;
import com.nutrition.food_catalog_service.enums.MacroCategory;

import java.util.List;
import java.util.UUID;

public interface IFoodItemService {
    FoodItemDTO createFoodItem(FoodItemCreateDTO createDTO);
    FoodItemDTO getFoodItemById(UUID id);
    List<FoodItemDTO> getAllFoodItems();
    List<FoodItemDTO> getFoodItemsByDominantMacro(MacroCategory macroCategory);
    FoodItemDTO updateFoodItem(UUID id, FoodItemUpdateDTO updateDTO);
    void deleteFoodItem(UUID id);
}