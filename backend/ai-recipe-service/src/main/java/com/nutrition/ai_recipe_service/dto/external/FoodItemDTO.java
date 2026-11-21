package com.nutrition.ai_recipe_service.dto.external;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String dominantMacro;
}