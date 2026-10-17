package com.nutrition.meal_prep_service.controller;

import com.nutrition.meal_prep_service.dto.*;
import com.nutrition.meal_prep_service.service.IMealPlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/meal-plans")
@RequiredArgsConstructor
public class MealPlanController {

    private final IMealPlanService mealPlanService;

    @PostMapping
    public ResponseEntity<MealPlanDTO> createMealPlan(@Valid @RequestBody MealPlanCreateDTO dto) {
        MealPlanDTO created = mealPlanService.createMealPlan(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MealPlanDTO>> getAllMealPlans() {
        return ResponseEntity.ok(mealPlanService.getAllMealPlans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlanDTO> getMealPlanById(@PathVariable UUID id) {
        return ResponseEntity.ok(mealPlanService.getMealPlanById(id));
    }

    @GetMapping("/{id}/shopping-list")
    public ResponseEntity<ShoppingListResponseDTO> getShoppingList(@PathVariable UUID id) {
        return ResponseEntity.ok(mealPlanService.generateShoppingList(id));
    }

    @PostMapping("/prices")
    public ResponseEntity<GroceryPriceDTO> recordGroceryPrice(@Valid @RequestBody GroceryPriceCreateDTO dto) {
        GroceryPriceDTO created = mealPlanService.recordGroceryPrice(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}