package com.nutrition.user_service.service;

import com.nutrition.user_service.dto.UserProfileCreateDTO;
import com.nutrition.user_service.dto.UserProfileDTO;
import com.nutrition.user_service.entity.UserProfile;
import com.nutrition.user_service.enums.GoalPace;
import com.nutrition.user_service.exception.BusinessException;
import com.nutrition.user_service.exception.ResourceNotFoundException;
import com.nutrition.user_service.mapper.UserProfileMapper;
import com.nutrition.user_service.repository.IUserProfileRepository;
import com.nutrition.user_service.service.IUserProfileService;
import com.nutrition.user_service.service.NutritionCalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserProfileService implements IUserProfileService {

    private final IUserProfileRepository userProfileRepository;
    private final NutritionCalculatorService calculatorService;
    private final UserProfileMapper userProfileMapper;

    @Override
    @Transactional
    public UserProfileDTO createProfile(UserProfileCreateDTO dto) {
        UUID effectiveUserId = (dto.getUserId() != null) ? dto.getUserId() : UUID.randomUUID();

        if (userProfileRepository.findByUserId(effectiveUserId).isPresent()) {
            throw new BusinessException("Există deja un profil asociat acestui utilizator.");
        }

        // Transmitem și dto.getGoalPace()
        NutritionCalculatorService.CalculationResult calc = calculatorService.calculate(
                dto.getGender(),
                dto.getAge(),
                dto.getHeightCm(),
                dto.getWeightKg(),
                dto.getActivityLevel(),
                dto.getGoal(),
                dto.getGoalPace()
        );

        dto.setUserId(effectiveUserId);
        UserProfile newProfile = userProfileMapper.toEntity(dto, calc);
        UserProfile saved = userProfileRepository.save(newProfile);

        return userProfileMapper.toDTO(saved);
    }

    @Override
    @Transactional
    public UserProfileDTO updateProfile(UUID profileId, UserProfileCreateDTO dto) {
        UserProfile existingProfile = userProfileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException("Profilul cu ID-ul " + profileId + " nu a fost găsit."));

        // Recalculăm cu noul goalPace
        NutritionCalculatorService.CalculationResult calc = calculatorService.calculate(
                dto.getGender(),
                dto.getAge(),
                dto.getHeightCm(),
                dto.getWeightKg(),
                dto.getActivityLevel(),
                dto.getGoal(),
                dto.getGoalPace()
        );

        existingProfile.setDisplayName(dto.getDisplayName());
        existingProfile.setGender(dto.getGender());
        existingProfile.setAge(dto.getAge());
        existingProfile.setHeightCm(dto.getHeightCm());
        existingProfile.setWeightKg(dto.getWeightKg());
        existingProfile.setActivityLevel(dto.getActivityLevel());
        existingProfile.setGoal(dto.getGoal());
        existingProfile.setGoalPace(dto.getGoalPace() != null ? dto.getGoalPace() : GoalPace.MODERATE); // <-- NOU
        existingProfile.setHealthConditions(dto.getHealthConditions() != null ? dto.getHealthConditions() : Set.of());
        existingProfile.setDietaryRestrictions(dto.getDietaryRestrictions() != null ? dto.getDietaryRestrictions() : Set.of());

        // Actualizăm noile rezultate calculate
        existingProfile.setBmi(calc.bmi());
        existingProfile.setBmiCategory(calc.bmiCategory());
        existingProfile.setBmr(calc.bmr());
        existingProfile.setTdee(calc.tdee());
        existingProfile.setTargetCalories(calc.targetCalories());
        existingProfile.setTargetProteinGrams(calc.targetProteinGrams());
        existingProfile.setTargetCarbsGrams(calc.targetCarbsGrams());
        existingProfile.setTargetFatGrams(calc.targetFatGrams());

        UserProfile updated = userProfileRepository.save(existingProfile);
        return userProfileMapper.toDTO(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileDTO getActiveProfile() {
        UserProfile profile = userProfileRepository.findFirstByOrderByUpdatedAtDesc()
                .orElseThrow(() -> new ResourceNotFoundException("Nu a fost găsit niciun profil salvat."));
        return userProfileMapper.toDTO(profile);
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileDTO getProfileByUserId(UUID userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profilul pentru utilizatorul cu ID " + userId + " nu a fost găsit."));
        return userProfileMapper.toDTO(profile);
    }

    @Override
    @Transactional
    public void deleteProfile(UUID profileId) {
        if (!userProfileRepository.existsById(profileId)) {
            throw new ResourceNotFoundException("Profilul cu ID-ul " + profileId + " nu există.");
        }
        userProfileRepository.deleteById(profileId);
    }
}