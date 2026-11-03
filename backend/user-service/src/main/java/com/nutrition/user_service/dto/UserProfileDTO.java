package com.nutrition.user_service.dto;
import com.nutrition.user_service.enums.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {

    private UUID id;
    private UUID userId;
    private String displayName;
    private Gender gender;
    private Integer age;
    private Double heightCm;
    private Double weightKg;
    private ActivityLevel activityLevel;
    private FitnessGoal goal;
    private GoalPace goalPace;
    private Set<HealthCondition> healthConditions;
    private Set<DietaryRestriction> dietaryRestrictions;

    // Rezultate calculate pe server
    private Double bmi;
    private BmiCategory bmiCategory;
    private Double bmr;
    private Double tdee;
    private Double targetCalories;
    private Double targetProteinGrams;
    private Double targetCarbsGrams;
    private Double targetFatGrams;
    private LocalDateTime updatedAt;
}