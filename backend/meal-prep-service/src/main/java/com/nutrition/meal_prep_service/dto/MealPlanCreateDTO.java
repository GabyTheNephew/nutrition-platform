package com.nutrition.meal_prep_service.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealPlanCreateDTO {

    @NotBlank(message = "Meal plan name is required.")
    private String name;

    @NotNull(message = "Start date is required.")
    private LocalDate startDate;

    @NotNull(message = "End date is required.")
    private LocalDate endDate;

    @NotEmpty(message = "Meal plan must contain at least one meal.")
    private List<@Valid MealPlanItemCreateDTO> items;
}