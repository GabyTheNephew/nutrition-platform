package com.nutrition.user_service.service;

import com.nutrition.user_service.enums.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class NutritionCalculatorService {

    public record CalculationResult(
            Double bmi,
            BmiCategory bmiCategory,
            Double bmr,
            Double tdee,
            Double targetCalories,
            Double targetProteinGrams,
            Double targetCarbsGrams,
            Double targetFatGrams
    ) {}

    public CalculationResult calculate(
            Gender gender,
            Integer age,
            Double heightCm,
            Double weightKg,
            ActivityLevel activityLevel,
            FitnessGoal goal,
            GoalPace pace) {

        // 1. BMI și Categorie (delegate către BmiCategory)
        double heightMeters = heightCm / 100.0;
        double bmi = roundToOneDecimal(weightKg / (heightMeters * heightMeters));
        BmiCategory bmiCategory = BmiCategory.fromBmi(bmi);

        // 2. BMR: Formula Mifflin-St Jeor
        double baseBmr = (10.0 * weightKg) + (6.25 * heightCm) - (5.0 * age);
        double bmr = Math.round((gender == Gender.MALE) ? (baseBmr + 5.0) : (baseBmr - 161.0));

        // 3. TDEE: delegat către coeficientul din ActivityLevel
        double tdee = Math.round(bmr * activityLevel.getMultiplier());

        // 4. Calorii Țintă: delegate către FitnessGoal (care folosește GoalPace)
        double targetCalories = Math.round(tdee * goal.getCalorieMultiplier(pace));

        // 5. Proteine (raportate la greutate prin FitnessGoal)
        double targetProteinGrams = Math.round(weightKg * goal.getProteinGramsPerKg());
        double proteinCalories = targetProteinGrams * 4.0;

        // 6. Grăsimi (raportate la greutate: 0.9g/kg bărbați, 1.0g/kg femei pentru sănătate hormonală)
        double fatGramsPerKg = (gender == Gender.MALE) ? 0.9 : 1.0;
        double targetFatGrams = Math.round(weightKg * fatGramsPerKg);
        double fatCalories = targetFatGrams * 9.0;

        // 7. Carbohidrați (diferența de calorii rămase)
        double remainingCalories = targetCalories - (proteinCalories + fatCalories);
        if (remainingCalories < 120.0) {
            remainingCalories = 120.0; // prag minim de siguranță: 30g carbohidrați
        }
        double targetCarbsGrams = Math.round(remainingCalories / 4.0);

        return new CalculationResult(
                bmi,
                bmiCategory,
                bmr,
                tdee,
                targetCalories,
                targetProteinGrams,
                targetCarbsGrams,
                targetFatGrams
        );
    }

    private double roundToOneDecimal(double value) {
        return BigDecimal.valueOf(value)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }
}