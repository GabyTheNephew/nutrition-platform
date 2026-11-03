package com.nutrition.user_service.mapper;

import com.nutrition.user_service.dto.UserProfileCreateDTO;
import com.nutrition.user_service.dto.UserProfileDTO;
import com.nutrition.user_service.entity.UserProfile;
import com.nutrition.user_service.enums.DietaryRestriction;
import com.nutrition.user_service.enums.GoalPace;
import com.nutrition.user_service.enums.HealthCondition;
import com.nutrition.user_service.service.NutritionCalculatorService.CalculationResult;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Component
public class UserProfileMapper {

    public UserProfile toEntity(UserProfileCreateDTO dto, CalculationResult calc) {
        if (dto == null) return null;

        Set<HealthCondition> conditions = (dto.getHealthConditions() != null)
                ? new HashSet<>(dto.getHealthConditions())
                : new HashSet<>();

        Set<DietaryRestriction> restrictions = (dto.getDietaryRestrictions() != null)
                ? new HashSet<>(dto.getDietaryRestrictions())
                : new HashSet<>();

        // Tratăm cazul în care s-a selectat NONE împreună cu altele sau doar NONE
        if (restrictions.contains(DietaryRestriction.NONE) && restrictions.size() > 1) {
            restrictions.remove(DietaryRestriction.NONE);
        }

        return UserProfile.builder()
                .userId(dto.getUserId() != null ? dto.getUserId() : UUID.randomUUID())
                .displayName(dto.getDisplayName())
                .gender(dto.getGender())
                .age(dto.getAge())
                .heightCm(dto.getHeightCm())
                .weightKg(dto.getWeightKg())
                .activityLevel(dto.getActivityLevel())
                .goal(dto.getGoal())
                .goalPace(dto.getGoalPace() != null ? dto.getGoalPace() : GoalPace.MODERATE)
                .healthConditions(conditions)
                .dietaryRestrictions(restrictions)
                .bmi(calc.bmi())
                .bmiCategory(calc.bmiCategory())
                .bmr(calc.bmr())
                .tdee(calc.tdee())
                .targetCalories(calc.targetCalories())
                .targetProteinGrams(calc.targetProteinGrams())
                .targetCarbsGrams(calc.targetCarbsGrams())
                .targetFatGrams(calc.targetFatGrams())
                .build();
    }

    public UserProfileDTO toDTO(UserProfile entity) {
        if (entity == null) return null;

        return UserProfileDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .displayName(entity.getDisplayName())
                .gender(entity.getGender())
                .age(entity.getAge())
                .heightCm(entity.getHeightCm())
                .weightKg(entity.getWeightKg())
                .activityLevel(entity.getActivityLevel())
                .goal(entity.getGoal())
                .goalPace(entity.getGoalPace())
                .healthConditions(entity.getHealthConditions())
                .dietaryRestrictions(entity.getDietaryRestrictions())
                .bmi(entity.getBmi())
                .bmiCategory(entity.getBmiCategory())
                .bmr(entity.getBmr())
                .tdee(entity.getTdee())
                .targetCalories(entity.getTargetCalories())
                .targetProteinGrams(entity.getTargetProteinGrams())
                .targetCarbsGrams(entity.getTargetCarbsGrams())
                .targetFatGrams(entity.getTargetFatGrams())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}