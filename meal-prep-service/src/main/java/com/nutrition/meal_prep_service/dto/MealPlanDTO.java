package com.nutrition.meal_prep_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealPlanDTO {
    private UUID id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<MealPlanItemDTO> items;
}