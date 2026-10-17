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

    @NotNull(message = "ID-ul alimentului este obligatoriu.")
    private UUID foodItemId;

    @NotNull(message = "Cantitatea în grame este obligatorie.")
    @Positive(message = "Cantitatea trebuie să fie mai mare ca zero.")
    private Double quantityGrams;
}