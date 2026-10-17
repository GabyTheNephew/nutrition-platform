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

    @NotBlank(message = "Numele planului este obligatoriu.")
    private String name;

    @NotNull(message = "Data de început este obligatorie.")
    private LocalDate startDate;

    @NotNull(message = "Data de sfârșit este obligatorie.")
    private LocalDate endDate;

    @NotEmpty(message = "Planul trebuie să conțină cel puțin o masă.")
    private List<@Valid MealPlanItemCreateDTO> items;
}
