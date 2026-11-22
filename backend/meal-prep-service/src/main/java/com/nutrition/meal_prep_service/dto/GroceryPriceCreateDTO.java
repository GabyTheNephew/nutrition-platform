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

    @NotNull(message = "Food item ID is required.")
    private UUID foodItemId;

    @NotNull(message = "Price per 100g is required.")
    @Positive(message = "Price must be greater than zero.")
    private Double pricePer100g;

    private LocalDate recordedDate; // Optional; defaults to today via @PrePersist if null
}