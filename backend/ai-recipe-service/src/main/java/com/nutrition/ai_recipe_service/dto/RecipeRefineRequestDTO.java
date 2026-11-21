package com.nutrition.ai_recipe_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class RecipeRefineRequestDTO {

    @NotNull(message = "Rețeta curentă este obligatorie.")
    private GeneratedRecipeDTO currentRecipe;

    @NotBlank(message = "Mesajul pentru AI este obligatoriu.")
    private String userMessage;

    private List<ChatMessageDTO> conversationHistory;
}