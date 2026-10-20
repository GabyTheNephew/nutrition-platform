package com.nutrition.food_catalog_service.repository;

import com.nutrition.food_catalog_service.entity.FoodItem;
import com.nutrition.food_catalog_service.enums.MacroCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IFoodItemRepository extends JpaRepository<FoodItem, UUID> {

    // Căutare după macronutrientul dominant (pentru ecranul de filtrare)
    List<FoodItem> findByDominantMacro(MacroCategory dominantMacro);

    // Căutare după nume fără a ține cont de litere mari/mici
    Optional<FoodItem> findByNameIgnoreCase(String name);

    List<FoodItem> findByNameContainingIgnoreCase(String name);

    // Verificare existență nume pentru prevenirea duplicatelor
    boolean existsByNameIgnoreCase(String name);
}