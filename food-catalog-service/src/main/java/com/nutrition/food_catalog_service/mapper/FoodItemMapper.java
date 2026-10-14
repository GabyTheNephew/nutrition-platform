package com.nutrition.food_catalog_service.mapper;

import com.nutrition.food_catalog_service.dto.FoodItemCreateDTO;
import com.nutrition.food_catalog_service.dto.FoodItemDTO;
import com.nutrition.food_catalog_service.dto.FoodItemUpdateDTO;
import com.nutrition.food_catalog_service.entity.FoodItem;
import org.springframework.stereotype.Component;

@Component
public class FoodItemMapper {

    public FoodItem toEntity(FoodItemCreateDTO dto) {
        if (dto == null) return null;
        return FoodItem.builder()
                .name(dto.getName())
                .calories(dto.getCalories())
                .protein(dto.getProtein())
                .carbohydrates(dto.getCarbohydrates())
                .fat(dto.getFat())
                .fiber(dto.getFiber() != null ? dto.getFiber() : 0.0)
                .build();
    }

    public FoodItemDTO toDTO(FoodItem entity) {
        if (entity == null) return null;
        return FoodItemDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .calories(entity.getCalories())
                .protein(entity.getProtein())
                .carbohydrates(entity.getCarbohydrates())
                .fat(entity.getFat())
                .fiber(entity.getFiber())
                .dominantMacro(entity.getDominantMacro())
                .build();
    }

    public void updateEntityFromDTO(FoodItemUpdateDTO dto, FoodItem entity) {
        if (dto == null || entity == null) return;
        entity.setName(dto.getName());
        entity.setCalories(dto.getCalories());
        entity.setProtein(dto.getProtein());
        entity.setCarbohydrates(dto.getCarbohydrates());
        entity.setFat(dto.getFat());
        entity.setFiber(dto.getFiber() != null ? dto.getFiber() : 0.0);
    }
}