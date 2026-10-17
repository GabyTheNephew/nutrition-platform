package com.nutrition.meal_prep_service.repository;

import com.nutrition.meal_prep_service.entity.GroceryPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GroceryPriceHistoryRepository extends JpaRepository<GroceryPriceHistory, UUID> {
    // Returnează ultimul preț cunoscut (ordonat descrescător după dată) pentru un aliment
    Optional<GroceryPriceHistory> findTopByFoodItemIdOrderByRecordedDateDesc(UUID foodItemId);
}