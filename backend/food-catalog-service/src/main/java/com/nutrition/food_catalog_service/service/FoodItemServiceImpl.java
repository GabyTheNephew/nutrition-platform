package com.nutrition.food_catalog_service.service;

import com.nutrition.food_catalog_service.dto.FoodItemCreateDTO;
import com.nutrition.food_catalog_service.dto.FoodItemDTO;
import com.nutrition.food_catalog_service.dto.FoodItemUpdateDTO;
import com.nutrition.food_catalog_service.entity.FoodItem;
import com.nutrition.food_catalog_service.enums.MacroCategory;
import com.nutrition.food_catalog_service.exception.BusinessException;
import com.nutrition.food_catalog_service.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import com.nutrition.food_catalog_service.mapper.FoodItemMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.nutrition.food_catalog_service.repository.IFoodItemRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FoodItemServiceImpl implements IFoodItemService {

    private final IFoodItemRepository foodItemRepository;
    private final FoodItemMapper foodItemMapper;

    @Override
    @Transactional
    public FoodItemDTO createFoodItem(FoodItemCreateDTO createDTO) {
        if (foodItemRepository.existsByNameIgnoreCase(createDTO.getName())) {
            throw new BusinessException("Alimentul cu numele '" + createDTO.getName() + "' există deja.");
        }

        FoodItem entity = foodItemMapper.toEntity(createDTO);
        FoodItem savedEntity = foodItemRepository.save(entity);
        return foodItemMapper.toDTO(savedEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public FoodItemDTO getFoodItemById(UUID id) {
        FoodItem entity = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alimentul cu ID-ul " + id + " nu a fost găsit."));
        return foodItemMapper.toDTO(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FoodItemDTO> getAllFoodItems() {
        return foodItemRepository.findAll().stream()
                .map(foodItemMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<FoodItemDTO> getFoodItemsByDominantMacro(MacroCategory macroCategory) {
        return foodItemRepository.findByDominantMacro(macroCategory).stream()
                .map(foodItemMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public FoodItemDTO updateFoodItem(UUID id, FoodItemUpdateDTO updateDTO) {
        FoodItem entity = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alimentul cu ID-ul " + id + " nu a fost găsit."));

        // Verifică dacă noul nume este deja folosit de un alt aliment
        foodItemRepository.findByNameIgnoreCase(updateDTO.getName())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new BusinessException("Numele '" + updateDTO.getName() + "' este deja folosit de un alt aliment.");
                    }
                });

        foodItemMapper.updateEntityFromDTO(updateDTO, entity);
        // calculateDominantMacro va rula automat prin @PreUpdate
        FoodItem updated = foodItemRepository.save(entity);
        return foodItemMapper.toDTO(updated);
    }

    @Override
    @Transactional
    public void deleteFoodItem(UUID id) {
        if (!foodItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Alimentul cu ID-ul " + id + " nu a fost găsit.");
        }
        foodItemRepository.deleteById(id);
    }
}