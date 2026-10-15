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

    @NotBlank(message = "Numele rețetei este obligatoriu.")
    private String name;

    private String instructions;

    @NotNull(message = "Numărul de porții este obligatoriu.")
    @Positive(message = "Numărul de porții trebuie să fie un număr pozitiv.")
    private Integer servings;

    @NotEmpty(message = "Rețeta trebuie să conțină cel puțin un ingredient.")
    private List<@Valid RecipeIngredientCreateDTO> ingredients;
    // Notă: @Valid aici forțează Spring să intre în fiecare element din listă și să-i valideze cantitatea și ID-ul
}