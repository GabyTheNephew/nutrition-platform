package com.nutrition.meal_prep_service.service;

import com.nutrition.meal_prep_service.dto.*;

import java.util.List;
import java.util.UUID;

public interface IMealPlanService {
    MealPlanDTO createMealPlan(MealPlanCreateDTO dto);
    List<MealPlanDTO> getAllMealPlans();
    MealPlanDTO getMealPlanById(UUID id);
    ShoppingListResponseDTO generateShoppingList(UUID mealPlanId);
    GroceryPriceDTO recordGroceryPrice(GroceryPriceCreateDTO dto);
}