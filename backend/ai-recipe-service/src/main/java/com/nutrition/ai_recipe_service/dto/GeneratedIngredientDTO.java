package com.nutrition.ai_recipe_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedIngredientDTO {
    private UUID foodItemId;
    private String foodName;
    private Double quantityGrams;
}