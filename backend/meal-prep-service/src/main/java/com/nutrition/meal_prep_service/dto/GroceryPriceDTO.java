package com.nutrition.meal_prep_service.dto;

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
public class GroceryPriceDTO {
    private UUID id;
    private UUID foodItemId;
    private Double pricePer100g;
    private LocalDate recordedDate;
}