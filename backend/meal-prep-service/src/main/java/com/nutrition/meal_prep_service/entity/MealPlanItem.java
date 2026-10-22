package com.nutrition.meal_prep_service.entity;

import com.nutrition.meal_prep_service.enums.MealType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "meal_plan_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealPlanItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    private MealPlan mealPlan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Column(name = "consume_date", nullable = false)
    private LocalDate consumeDate; // Data exactă în care este planificată masa

    @Column(name = "servings", nullable = false)
    @Builder.Default
    private Integer servings = 1; // Câte porții mănânci la acea masă (implicit 1)
}