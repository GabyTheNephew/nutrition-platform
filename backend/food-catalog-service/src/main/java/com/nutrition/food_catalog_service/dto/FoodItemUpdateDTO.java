package com.nutrition.food_catalog_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItemUpdateDTO {

    @NotBlank(message = "Food name is required.")
    private String name;

    @PositiveOrZero(message = "Calories cannot be negative.")
    private Double calories;

    @NotNull(message = "Protein amount is required.")
    @PositiveOrZero(message = "Protein amount cannot be negative.")
    private Double protein;

    @NotNull(message = "Carbohydrates amount is required.")
    @PositiveOrZero(message = "Carbohydrates amount cannot be negative.")
    private Double carbohydrates;

    @NotNull(message = "Fat amount is required.")
    @PositiveOrZero(message = "Fat amount cannot be negative.")
    private Double fat;

    @PositiveOrZero(message = "Fiber amount cannot be negative.")
    private Double fiber;
}