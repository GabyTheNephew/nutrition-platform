package com.nutrition.meal_prep_service.dto;

import com.nutrition.meal_prep_service.enums.MealType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealPlanItemCreateDTO {

    @NotNull(message = "ID-ul rețetei este obligatoriu.")
    private UUID recipeId;

    @NotNull(message = "Tipul mesei este obligatoriu.")
    private MealType mealType;

    @NotNull(message = "Data mesei este obligatorie.")
    private LocalDate consumeDate;

    @Builder.Default
    private Integer servings = 1;
}