package com.nutrition.ai_recipe_service.client;

import com.nutrition.ai_recipe_service.dto.external.UserProfileDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "user-service")
public interface UserProfileClient {

    @GetMapping("/api/user-profile/active")
    UserProfileDTO getActiveProfile();
}