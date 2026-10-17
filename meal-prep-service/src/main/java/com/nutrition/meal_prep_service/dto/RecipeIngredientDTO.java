package com.nutrition.meal_prep_service.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredientDTO {
    private UUID id;
    private UUID foodItemId;
    private String foodName;
    private Double quantityGrams;
}