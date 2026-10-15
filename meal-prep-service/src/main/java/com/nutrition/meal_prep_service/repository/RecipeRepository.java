package com.nutrition.meal_prep_service.repository;

import com.nutrition.meal_prep_service.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, UUID> {
    boolean existsByNameIgnoreCase(String name);
}