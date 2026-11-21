package com.nutrition.ai_recipe_service.client;

import com.nutrition.ai_recipe_service.dto.external.FoodItemDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "food-catalog-service")
public interface FoodCatalogClient {

    @GetMapping("/api/foods")
    List<FoodItemDTO> getAllFoods();
}