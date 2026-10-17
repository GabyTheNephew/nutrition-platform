package com.nutrition.meal_prep_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShoppingListResponseDTO {
    private UUID mealPlanId;
    private String mealPlanName;
    private Double estimatedTotalCost; // Costul total în RON
    private List<ShoppingListItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ShoppingListItemDTO {
        private UUID foodItemId;
        private String foodName;
        private Double totalQuantityGrams;
        private Double estimatedItemCost; // Costul estimat pentru acest ingredient
    }
}