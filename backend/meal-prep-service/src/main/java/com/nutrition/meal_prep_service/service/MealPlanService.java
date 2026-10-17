package com.nutrition.meal_prep_service.service;

import com.nutrition.meal_prep_service.dto.*;
import com.nutrition.meal_prep_service.entity.*;
import com.nutrition.meal_prep_service.exception.BusinessException;
import com.nutrition.meal_prep_service.exception.ResourceNotFoundException;
import com.nutrition.meal_prep_service.mapper.MealPlanMapper;
import com.nutrition.meal_prep_service.repository.GroceryPriceHistoryRepository;
import com.nutrition.meal_prep_service.repository.MealPlanRepository;
import com.nutrition.meal_prep_service.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MealPlanService implements IMealPlanService {

    private final MealPlanRepository mealPlanRepository;
    private final RecipeRepository recipeRepository;
    private final GroceryPriceHistoryRepository priceHistoryRepository;
    private final MealPlanMapper mealPlanMapper;

    @Override
    @Transactional
    public MealPlanDTO createMealPlan(MealPlanCreateDTO dto) {
        if (dto.getEndDate().isBefore(dto.getStartDate())) {
            throw new BusinessException("Data de sfârșit nu poate fi înaintea datei de început.");
        }

        MealPlan mealPlan = MealPlan.builder()
                .name(dto.getName())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .build();

        for (MealPlanItemCreateDTO itemDto : dto.getItems()) {
            Recipe recipe = recipeRepository.findById(itemDto.getRecipeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Rețeta nu a fost găsită: " + itemDto.getRecipeId()));

            MealPlanItem mealPlanItem = MealPlanItem.builder()
                    .recipe(recipe)
                    .mealType(itemDto.getMealType())
                    .plannedServings(itemDto.getPlannedServings())
                    .build();

            mealPlan.addItem(mealPlanItem);
        }

        MealPlan savedPlan = mealPlanRepository.save(mealPlan);
        return mealPlanMapper.toDTO(savedPlan);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MealPlanDTO> getAllMealPlans() {
        return mealPlanRepository.findAll().stream()
                .map(mealPlanMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MealPlanDTO getMealPlanById(UUID id) {
        MealPlan mealPlan = mealPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Planul cu ID-ul " + id + " nu a fost găsit."));
        return mealPlanMapper.toDTO(mealPlan);
    }

    @Override
    @Transactional(readOnly = true)
    public ShoppingListResponseDTO generateShoppingList(UUID mealPlanId) {
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId)
                .orElseThrow(() -> new ResourceNotFoundException("Planul cu ID-ul " + mealPlanId + " nu a fost găsit."));

        // Folosim direct DTO-ul în Map, fără nicio clasă internă în plus!
        Map<UUID, ShoppingListResponseDTO.ShoppingListItemDTO> aggregatedMap = new HashMap<>();

        // 1. Adunăm gramajele din toate rețetele planului
        for (MealPlanItem planItem : mealPlan.getItems()) {
            Recipe recipe = planItem.getRecipe();
            double scaleFactor = (double) planItem.getPlannedServings() / recipe.getServings();

            for (RecipeIngredient ingredient : recipe.getIngredients()) {
                UUID foodId = ingredient.getFoodItemId();
                double scaledQuantity = ingredient.getQuantityGrams() * scaleFactor;

                // Dacă alimentul nu e încă pe listă, îl inițializăm cu 0 grame
                aggregatedMap.putIfAbsent(foodId, ShoppingListResponseDTO.ShoppingListItemDTO.builder()
                        .foodItemId(foodId)
                        .foodName(ingredient.getFoodName())
                        .totalQuantityGrams(0.0)
                        .build());

                // Adunăm cantitatea curentă la totalul existent
                ShoppingListResponseDTO.ShoppingListItemDTO currentItem = aggregatedMap.get(foodId);
                currentItem.setTotalQuantityGrams(currentItem.getTotalQuantityGrams() + scaledQuantity);
            }
        }

        // 2. Calculăm prețul estimat pentru fiecare aliment adunat
        double totalPlanCost = 0.0;
        for (ShoppingListResponseDTO.ShoppingListItemDTO item : aggregatedMap.values()) {
            Optional<GroceryPriceHistory> lastPriceOpt = priceHistoryRepository
                    .findTopByFoodItemIdOrderByRecordedDateDesc(item.getFoodItemId());

            if (lastPriceOpt.isPresent()) {
                double pricePer100g = lastPriceOpt.get().getPricePer100g();
                double estimatedCost = (item.getTotalQuantityGrams() / 100.0) * pricePer100g;
                item.setEstimatedItemCost(estimatedCost);
                totalPlanCost += estimatedCost;
            }
        }

        return ShoppingListResponseDTO.builder()
                .mealPlanId(mealPlan.getId())
                .mealPlanName(mealPlan.getName())
                .estimatedTotalCost(totalPlanCost)
                .items(new ArrayList<>(aggregatedMap.values()))
                .build();
    }

    @Override
    @Transactional
    public GroceryPriceDTO recordGroceryPrice(GroceryPriceCreateDTO dto) {
        GroceryPriceHistory history = GroceryPriceHistory.builder()
                .foodItemId(dto.getFoodItemId())
                .pricePer100g(dto.getPricePer100g())
                .recordedDate(dto.getRecordedDate())
                .build();

        GroceryPriceHistory saved = priceHistoryRepository.save(history);

        return GroceryPriceDTO.builder()
                .id(saved.getId())
                .foodItemId(saved.getFoodItemId())
                .pricePer100g(saved.getPricePer100g())
                .recordedDate(saved.getRecordedDate())
                .build();
    }

    @Override
    @Transactional
    public void deleteMealPlan(UUID id) {
        if (!mealPlanRepository.existsById(id)) {
            throw new ResourceNotFoundException("Planul cu ID-ul " + id + " nu a fost găsit.");
        }

        mealPlanRepository.deleteById(id);
    }

}