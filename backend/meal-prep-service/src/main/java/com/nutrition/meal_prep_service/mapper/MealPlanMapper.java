package com.nutrition.meal_prep_service.mapper;

import com.nutrition.meal_prep_service.dto.MealPlanDTO;
import com.nutrition.meal_prep_service.dto.MealPlanItemDTO;
import com.nutrition.meal_prep_service.entity.MealPlan;
import com.nutrition.meal_prep_service.entity.MealPlanItem;
import org.springframework.stereotype.Component;

@Component
public class MealPlanMapper {

    public MealPlanDTO toDTO(MealPlan entity) {
        if (entity == null) return null;

        return MealPlanDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .items(entity.getItems().stream()
                        .map(this::toItemDTO)
                        .toList())
                .build();
    }

    public MealPlanItemDTO toItemDTO(MealPlanItem item) {
        if (item == null) return null;

        return MealPlanItemDTO.builder()
                .id(item.getId())
                .recipeId(item.getRecipe().getId())
                .recipeName(item.getRecipe().getName())
                .mealType(item.getMealType())
                .consumeDate(item.getConsumeDate())
                .servings(item.getServings())
                .build();
    }
}