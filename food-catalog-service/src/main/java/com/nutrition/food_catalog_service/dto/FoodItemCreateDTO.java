package com.nutrition.food_catalog_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItemCreateDTO {

    @NotBlank(message = "Numele alimentului este obligatoriu.")
    private String name;

    @PositiveOrZero(message = "Valoarea caloriilor nu poate fi negativă.")
    private Double calories; // Poate fi null, se calculează automat dacă nu e trimis

    @NotNull(message = "Cantitatea de proteine este obligatorie.")
    @PositiveOrZero(message = "Cantitatea de proteine nu poate fi negativă.")
    private Double protein;

    @NotNull(message = "Cantitatea de carbohidrați este obligatorie.")
    @PositiveOrZero(message = "Cantitatea de carbohidrați nu poate fi negativă.")
    private Double carbohydrates;

    @NotNull(message = "Cantitatea de grăsimi este obligatorie.")
    @PositiveOrZero(message = "Cantitatea de grăsimi nu poate fi negativă.")
    private Double fat;

    @PositiveOrZero(message = "Cantitatea de fibre nu poate fi negativă.")
    private Double fiber;
}