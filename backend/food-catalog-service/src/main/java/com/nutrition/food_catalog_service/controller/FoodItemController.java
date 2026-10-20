package com.nutrition.food_catalog_service.controller;

import com.nutrition.food_catalog_service.dto.FoodItemCreateDTO;
import com.nutrition.food_catalog_service.dto.FoodItemDTO;
import com.nutrition.food_catalog_service.dto.FoodItemUpdateDTO;
import com.nutrition.food_catalog_service.enums.MacroCategory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nutrition.food_catalog_service.service.IFoodItemService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodItemController {

    private final IFoodItemService foodItemService;

    @PostMapping
    public ResponseEntity<FoodItemDTO> createFoodItem(@Valid @RequestBody FoodItemCreateDTO createDTO) {
        FoodItemDTO created = foodItemService.createFoodItem(createDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FoodItemDTO>> getAllFoods() {
        return ResponseEntity.ok(foodItemService.getAllFoodItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItemDTO> getFoodById(@PathVariable UUID id) {
        return ResponseEntity.ok(foodItemService.getFoodItemById(id));
    }

    @GetMapping("/dominant/{macroCategory}")
    public ResponseEntity<List<FoodItemDTO>> getFoodsByDominantMacro(@PathVariable MacroCategory macroCategory) {
        return ResponseEntity.ok(foodItemService.getFoodItemsByDominantMacro(macroCategory));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItemDTO> updateFoodItem(
            @PathVariable UUID id,
            @Valid @RequestBody FoodItemUpdateDTO updateDTO) {
        return ResponseEntity.ok(foodItemService.updateFoodItem(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable UUID id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoodItemDTO>> searchFoods(@RequestParam("query") String query) {
        return ResponseEntity.ok(foodItemService.searchFoodItemsByName(query));
    }
}