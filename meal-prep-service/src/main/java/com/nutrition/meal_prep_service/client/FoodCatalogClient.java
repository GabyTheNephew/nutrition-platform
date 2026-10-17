package com.nutrition.meal_prep_service.client;

import com.nutrition.meal_prep_service.dto.external.FoodItemDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(name = "food-catalog-service")
public interface FoodCatalogClient {

    @GetMapping("/api/foods/{id}")
    FoodItemDTO getFoodById(@PathVariable("id") UUID id);
}