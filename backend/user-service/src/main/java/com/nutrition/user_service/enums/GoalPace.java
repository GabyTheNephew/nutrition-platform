package com.nutrition.user_service.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GoalPace {
    CONSERVATIVE(-0.10, 0.05), // -10% la slăbire, +5% la masă
    MODERATE(-0.20, 0.10),     // -20% la slăbire, +10% la masă
    AGGRESSIVE(-0.25, 0.15);   // -25% la slăbire, +15% la masă

    private final double deficitAdjustment;
    private final double surplusAdjustment;
}