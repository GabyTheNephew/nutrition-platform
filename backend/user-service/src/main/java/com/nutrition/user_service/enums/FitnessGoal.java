package com.nutrition.user_service.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FitnessGoal {

    LOSE_WEIGHT(2.0) {
        @Override
        public double getCalorieMultiplier(GoalPace pace) {
            GoalPace effectivePace = (pace != null) ? pace : GoalPace.MODERATE;
            return 1.0 + effectivePace.getDeficitAdjustment(); // ex: 1.0 + (-0.20) = 0.80
        }
    },

    GAIN_MUSCLE(1.8) {
        @Override
        public double getCalorieMultiplier(GoalPace pace) {
            GoalPace effectivePace = (pace != null) ? pace : GoalPace.MODERATE;
            return 1.0 + effectivePace.getSurplusAdjustment(); // ex: 1.0 + (+0.10) = 1.10
        }
    },

    BODY_RECOMPOSITION(2.0) {
        @Override
        public double getCalorieMultiplier(GoalPace pace) {
            return 1.0; // Menținere neutră (100% din TDEE)
        }
    },

    MAINTAIN_WEIGHT(1.5) {
        @Override
        public double getCalorieMultiplier(GoalPace pace) {
            return 1.0; // Menținere neutră (100% din TDEE)
        }
    };

    private final double proteinGramsPerKg;

    public abstract double getCalorieMultiplier(GoalPace pace);
}
