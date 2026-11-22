package com.nutrition.food_catalog_service.config;

import com.nutrition.food_catalog_service.entity.FoodItem;
import com.nutrition.food_catalog_service.repository.IFoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final IFoodItemRepository foodItemRepository;

    @Override
    public void run(String... args) {
        // Populate only if the database table is completely empty
        if (foodItemRepository.count() == 0) {
            List<FoodItem> defaultFoods = List.of(
                    FoodItem.builder()
                            .name("Chicken Breast")
                            .protein(31.0)
                            .carbohydrates(0.0)
                            .fat(3.6)
                            .fiber(0.0)
                            .build(),
                    FoodItem.builder()
                            .name("Rolled Oats")
                            .protein(13.5)
                            .carbohydrates(68.0)
                            .fat(7.0)
                            .fiber(10.0)
                            .build(),
                    FoodItem.builder()
                            .name("Olive Oil")
                            .protein(0.0)
                            .carbohydrates(0.0)
                            .fat(100.0)
                            .fiber(0.0)
                            .build(),
                    FoodItem.builder()
                            .name("Whole Eggs")
                            .protein(13.0)
                            .carbohydrates(1.1)
                            .fat(11.0)
                            .fiber(0.0)
                            .build(),
                    FoodItem.builder()
                            .name("Basmati Rice")
                            .protein(8.0)
                            .carbohydrates(78.0)
                            .fat(0.9)
                            .fiber(1.4)
                            .build()
            );

            // saveAll automatically triggers @PrePersist in the entity,
            // calculating total calories and dominantMacro for each food item
            foodItemRepository.saveAll(defaultFoods);
        }
    }
}