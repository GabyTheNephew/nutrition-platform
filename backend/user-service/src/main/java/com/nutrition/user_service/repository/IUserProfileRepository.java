package com.nutrition.user_service.repository;

import com.nutrition.user_service.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IUserProfileRepository extends JpaRepository<UserProfile, UUID> {

    Optional<UserProfile> findByUserId(UUID userId);

    // Găsește cel mai recent profil creat/actualizat (util ca profil activ implicit)
    Optional<UserProfile> findFirstByOrderByUpdatedAtDesc();
}