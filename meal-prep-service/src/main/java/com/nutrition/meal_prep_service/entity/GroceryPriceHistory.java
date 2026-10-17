package com.nutrition.meal_prep_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "grocery_price_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroceryPriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "food_item_id", nullable = false)
    private UUID foodItemId;

    @Column(name = "price_per_100g", nullable = false)
    private Double pricePer100g; // Prețul în RON per 100g (ex: 3.5 RON / 100g piept de pui)

    @Column(name = "recorded_date", nullable = false)
    private LocalDate recordedDate;

    @PrePersist
    public void setDefaultDate() {
        if (this.recordedDate == null) {
            this.recordedDate = LocalDate.now();
        }
    }
}