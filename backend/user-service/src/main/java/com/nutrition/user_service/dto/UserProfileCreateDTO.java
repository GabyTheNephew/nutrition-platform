package com.nutrition.user_service.dto;

import com.nutrition.user_service.enums.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileCreateDTO {

    // Identificator utilizator (opțional din frontend momentan; dacă lipsește, se generează un UUID implicit)
    private UUID userId;

    @NotBlank(message = "Numele afișat este obligatoriu.")
    @Size(min = 2, max = 50, message = "Numele trebuie să aibă între 2 și 50 de caractere.")
    private String displayName;

    @NotNull(message = "Sexul este obligatoriu.")
    private Gender gender;

    @NotNull(message = "Vârsta este obligatorie.")
    @Min(value = 14, message = "Vârsta minimă este de 14 ani.")
    @Max(value = 100, message = "Vârsta maximă admisă este de 100 de ani.")
    private Integer age;

    @NotNull(message = "Înălțimea este obligatorie.")
    @DecimalMin(value = "100.0", message = "Înălțimea minimă este de 100 cm.")
    @DecimalMax(value = "250.0", message = "Înălțimea maximă este de 250 cm.")
    private Double heightCm;

    @NotNull(message = "Greutatea este obligatorie.")
    @DecimalMin(value = "30.0", message = "Greutatea minimă este de 30 kg.")
    @DecimalMax(value = "300.0", message = "Greutatea maximă este de 300 kg.")
    private Double weightKg;

    @NotNull(message = "Nivelul de activitate este obligatoriu.")
    private ActivityLevel activityLevel;

    @NotNull(message = "Obiectivul este obligatoriu.")
    private FitnessGoal goal;

    private GoalPace goalPace;

    private Set<HealthCondition> healthConditions;

    private Set<DietaryRestriction> dietaryRestrictions;
}