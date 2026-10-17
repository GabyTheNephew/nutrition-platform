package com.nutrition.meal_prep_service.dto;

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
public class GroceryPriceCreateDTO {

    @NotNull(message = "ID-ul alimentului este obligatoriu.")
    private UUID foodItemId;

    @NotNull(message = "Prețul per 100g este obligatoriu.")
    @Positive(message = "Prețul trebuie să fie mai mare ca zero.")
    private Double pricePer100g;

    private LocalDate recordedDate; // Opțional, dacă e null se pune azi prin @PrePersist
}