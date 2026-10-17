package com.nutrition.meal_prep_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "recipe_ingredients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(name = "food_item_id", nullable = false)
    private UUID foodItemId; // ID-ul alimentului din food-catalog-service

    @Column(name = "food_name", nullable = false)
    private String foodName; // Salvăm și numele (caching local) pentru afișare rapidă

    @Column(name = "quantity_grams", nullable = false)
    private Double quantityGrams; // Cantitatea exactă în grame (ex: 200.0)
}