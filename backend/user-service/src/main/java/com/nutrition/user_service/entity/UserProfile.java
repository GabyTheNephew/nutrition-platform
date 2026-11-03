package com.nutrition.user_service.entity;

import com.nutrition.user_service.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Până la adăugarea Keycloak/OAuth2, folosim un identificator unic stabil
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private Integer age;

    @Column(name = "height_cm", nullable = false)
    private Double heightCm;

    @Column(name = "weight_kg", nullable = false)
    private Double weightKg;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level", nullable = false)
    private ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "fitness_goal", nullable = false)
    private FitnessGoal goal;

    @Enumerated(EnumType.STRING)
    @Column(name = "goal_pace", nullable = false)
    @Builder.Default
    private GoalPace goalPace = GoalPace.MODERATE;

    // Colecție de afecțiuni medicale stocată în tabela asociată user_profile_health_conditions
    @ElementCollection(targetClass = HealthCondition.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_profile_health_conditions", joinColumns = @JoinColumn(name = "profile_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "health_condition")
    @Builder.Default
    private Set<HealthCondition> healthConditions = new HashSet<>();

    // Colecție de alergii/restricții stocată în tabela asociată user_profile_dietary_restrictions
    @ElementCollection(targetClass = DietaryRestriction.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_profile_dietary_restrictions", joinColumns = @JoinColumn(name = "profile_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "dietary_restriction")
    @Builder.Default
    private Set<DietaryRestriction> dietaryRestrictions = new HashSet<>();

    // --- Câmpuri calculate pe server (Nutritional Targets) ---

    @Column(nullable = false)
    private Double bmi;

    @Column(name = "bmi_category", nullable = false)
    private BmiCategory bmiCategory;

    @Column(nullable = false)
    private Double bmr; // Basal Metabolic Rate (kcal)

    @Column(nullable = false)
    private Double tdee; // Total Daily Energy Expenditure (kcal)

    @Column(name = "target_calories", nullable = false)
    private Double targetCalories;

    @Column(name = "target_protein_grams", nullable = false)
    private Double targetProteinGrams;

    @Column(name = "target_carbs_grams", nullable = false)
    private Double targetCarbsGrams;

    @Column(name = "target_fat_grams", nullable = false)
    private Double targetFatGrams;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    public void prePersist() {
        this.updatedAt = LocalDateTime.now();
    }
}
