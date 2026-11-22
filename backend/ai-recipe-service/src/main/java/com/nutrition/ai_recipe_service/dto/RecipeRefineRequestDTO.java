package com.nutrition.ai_recipe_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class RecipeRefineRequestDTO {

    @NotNull(message = "Current recipe is required.")
    private GeneratedRecipeDTO currentRecipe;

    @NotBlank(message = "Message for AI is required.")
    @Size(max = 400, message = "Message cannot exceed 400 characters.")
    private String userMessage;

    private List<ChatMessageDTO> conversationHistory;
}