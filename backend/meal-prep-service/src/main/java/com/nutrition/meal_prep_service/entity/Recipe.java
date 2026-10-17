package com.nutrition.meal_prep_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "recipes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(nullable = false)
    private Integer servings; // Numărul de porții pe care le produce rețeta

    // Macronutrienții TOTALI ai întregii rețete (calculați automat la salvare)
    @Column(nullable = false)
    private Double totalCalories;

    @Column(nullable = false)
    private Double totalProtein;

    @Column(nullable = false)
    private Double totalCarbohydrates;

    @Column(nullable = false)
    private Double totalFat;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<RecipeIngredient> ingredients = new ArrayList<>();

    // Metodă ajutătoare pentru a lega bidirecțional ingredientele de rețetă
    public void addIngredient(RecipeIngredient ingredient) {
        ingredients.add(ingredient);
        ingredient.setRecipe(this);
    }
}