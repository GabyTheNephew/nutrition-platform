package com.nutrition.food_catalog_service.entity;
import com.nutrition.food_catalog_service.enums.MacroCategory;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "food_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private Double calories; // kcal per 100g

    @Column(nullable = false)
    private Double protein; // g per 100g

    @Column(nullable = false)
    private Double carbohydrates; // g per 100g

    @Column(nullable = false)
    private Double fat; // g per 100g

    @Column(nullable = false)
    private Double fiber; // g per 100g

    @Enumerated(EnumType.STRING)
    @Column(name = "dominant_macro", nullable = false)
    private MacroCategory dominantMacro;

    /**
     * Calculează automat categoria dominantă pe baza aportului caloric:
     * 1g Proteină = 4 kcal
     * 1g Carbohidrați = 4 kcal
     * 1g Grăsimi = 9 kcal
     */
    @PrePersist
    @PreUpdate
    public void calculateDominantMacro() {
        double proteinCalories = (this.protein != null ? this.protein : 0.0) * 4.0;
        double carbCalories = (this.carbohydrates != null ? this.carbohydrates : 0.0) * 4.0;
        double fatCalories = (this.fat != null ? this.fat : 0.0) * 9.0;

        if (proteinCalories >= carbCalories && proteinCalories >= fatCalories) {
            this.dominantMacro = MacroCategory.PROTEIN;
        } else if (carbCalories >= proteinCalories && carbCalories >= fatCalories) {
            this.dominantMacro = MacroCategory.CARBOHYDRATE;
        } else {
            this.dominantMacro = MacroCategory.FAT;
        }

        // Dacă nu s-au furnizat caloriile manual, se pot calcula automat
        if (this.calories == null || this.calories == 0.0) {
            this.calories = proteinCalories + carbCalories + fatCalories;
        }
    }
}
