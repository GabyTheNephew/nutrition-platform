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
        // Populează doar dacă tabela din baza de date este complet goală
        if (foodItemRepository.count() == 0) {
            List<FoodItem> defaultFoods = List.of(
                    FoodItem.builder()
                            .name("Piept de pui")
                            .protein(31.0)
                            .carbohydrates(0.0)
                            .fat(3.6)
                            .fiber(0.0)
                            .build(),
                    FoodItem.builder()
                            .name("Fulgi de ovaz")
                            .protein(13.5)
                            .carbohydrates(68.0)
                            .fat(7.0)
                            .fiber(10.0)
                            .build(),
                    FoodItem.builder()
                            .name("Ulei de masline")
                            .protein(0.0)
                            .carbohydrates(0.0)
                            .fat(100.0)
                            .fiber(0.0)
                            .build(),
                    FoodItem.builder()
                            .name("Oua intregi")
                            .protein(13.0)
                            .carbohydrates(1.1)
                            .fat(11.0)
                            .fiber(0.0)
                            .build(),
                    FoodItem.builder()
                            .name("Orez basmati")
                            .protein(8.0)
                            .carbohydrates(78.0)
                            .fat(0.9)
                            .fiber(1.4)
                            .build()
            );

            // saveAll apelează automat mecanismele @PrePersist din entitate,
            // calculând caloriile totale și dominantMacro pentru fiecare aliment
            foodItemRepository.saveAll(defaultFoods);
        }
    }
}