package com.nutrition.user_service.service;

import com.nutrition.user_service.dto.UserProfileCreateDTO;
import com.nutrition.user_service.dto.UserProfileDTO;

import java.util.UUID;

public interface IUserProfileService {

    UserProfileDTO createProfile(UserProfileCreateDTO dto);

    UserProfileDTO updateProfile(UUID profileId, UserProfileCreateDTO dto);

    UserProfileDTO getActiveProfile();

    UserProfileDTO getProfileByUserId(UUID userId);

    void deleteProfile(UUID profileId);
}