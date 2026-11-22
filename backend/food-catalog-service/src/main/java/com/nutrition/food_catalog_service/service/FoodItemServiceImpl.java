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
            throw new BusinessException("Food item with name '" + createDTO.getName() + "' already exists.");
        }

        FoodItem entity = foodItemMapper.toEntity(createDTO);
        FoodItem savedEntity = foodItemRepository.save(entity);
        return foodItemMapper.toDTO(savedEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public FoodItemDTO getFoodItemById(UUID id) {
        FoodItem entity = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item with ID " + id + " was not found."));
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
                .orElseThrow(() -> new ResourceNotFoundException("Food item with ID " + id + " was not found."));

        // Check if the new name is already used by another food item
        foodItemRepository.findByNameIgnoreCase(updateDTO.getName())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new BusinessException("The name '" + updateDTO.getName() + "' is already used by another food item.");
                    }
                });

        foodItemMapper.updateEntityFromDTO(updateDTO, entity);
        // calculateDominantMacro will run automatically via @PreUpdate
        FoodItem updated = foodItemRepository.save(entity);
        return foodItemMapper.toDTO(updated);
    }

    @Override
    @Transactional
    public void deleteFoodItem(UUID id) {
        if (!foodItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Food item with ID " + id + " was not found.");
        }
        foodItemRepository.deleteById(id);
    }

    @Override
    public List<FoodItemDTO> searchFoodItemsByName(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllFoodItems();
        }
        return foodItemRepository.findByNameContainingIgnoreCase(query.trim())
                .stream()
                .map(foodItemMapper::toDTO)
                .toList();
    }
}