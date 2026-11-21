package com.nutrition.ai_recipe_service.dto.external;

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
public class UserProfileDTO {
    private UUID id;
    private String displayName;
    private Double targetCalories;
    private Double targetProteinGrams;
    private Double targetCarbsGrams;
    private Double targetFatGrams;
    private List<String> healthConditions;
    private List<String> dietaryRestrictions;
}