package com.nutrition.ai_recipe_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedRecipeListDTO {
    private List<GeneratedRecipeDTO> recipes;
}