package com.nutrition.meal_prep_service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredientCreateDTO {

    @NotNull(message = "Food item ID is required.")
    private UUID foodItemId;

    @NotNull(message = "Quantity in grams is required.")
    @Positive(message = "Quantity must be greater than zero.")
    private Double quantityGrams;
}