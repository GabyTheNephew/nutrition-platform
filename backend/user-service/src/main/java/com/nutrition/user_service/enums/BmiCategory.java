package com.nutrition.user_service.enums;

public enum BmiCategory {
    UNDERWEIGHT,
    NORMAL,
    OVERWEIGHT,
    OBESE;

    public static BmiCategory fromBmi(double bmi) {
        if (bmi < 18.5) return UNDERWEIGHT;
        if (bmi < 25.0) return NORMAL;
        if (bmi < 30.0) return OVERWEIGHT;
        return OBESE;
    }
}