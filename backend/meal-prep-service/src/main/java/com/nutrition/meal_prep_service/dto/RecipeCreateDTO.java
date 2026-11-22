package com.nutrition.meal_prep_service.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeCreateDTO {

    @NotBlank(message = "Recipe name is required.")
    private String name;

    private String instructions;

    @NotNull(message = "Number of servings is required.")
    @Positive(message = "Number of servings must be a positive number.")
    private Integer servings;

    @NotEmpty(message = "Recipe must contain at least one ingredient.")
    private List<@Valid RecipeIngredientCreateDTO> ingredients;
    // Note: @Valid here forces Spring to validate each element's quantity and ID in the list
}