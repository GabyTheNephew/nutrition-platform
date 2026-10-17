package com.nutrition.food_catalog_service.dto;

import com.nutrition.food_catalog_service.enums.MacroCategory;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItemDTO {
    private UUID id;
    private String name;
    private Double calories;
    private Double protein;
    private Double carbohydrates;
    private Double fat;
    private Double fiber;
    private MacroCategory dominantMacro;
}