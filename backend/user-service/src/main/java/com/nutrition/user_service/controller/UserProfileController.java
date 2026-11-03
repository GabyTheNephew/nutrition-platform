package com.nutrition.user_service.controller;

import com.nutrition.user_service.dto.UserProfileCreateDTO;
import com.nutrition.user_service.dto.UserProfileDTO;
import com.nutrition.user_service.service.IUserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/user-profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final IUserProfileService userProfileService;

    @PostMapping
    public ResponseEntity<UserProfileDTO> createProfile(@Valid @RequestBody UserProfileCreateDTO request) {
        UserProfileDTO created = userProfileService.createProfile(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED); // 201 CREATED
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDTO> updateProfile(
            @PathVariable UUID id,
            @Valid @RequestBody UserProfileCreateDTO request) {
        UserProfileDTO updated = userProfileService.updateProfile(id, request);
        return ResponseEntity.ok(updated); // 200 OK
    }

    @GetMapping("/active")
    public ResponseEntity<UserProfileDTO> getActiveProfile() {
        return ResponseEntity.ok(userProfileService.getActiveProfile());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserProfileDTO> getProfileByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(userProfileService.getProfileByUserId(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable UUID id) {
        userProfileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}