package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Category;
import com.neu.onestopgo.models.StoreItemQuantity;
import com.neu.onestopgo.repositories.StoreItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StoreItemService {

    private final StoreItemRepository storeItemRepository;

    private final CategoryService categoryService;

    @Autowired
    public StoreItemService(StoreItemRepository storeItemRepository, CategoryService categoryService) {
        this.storeItemRepository = storeItemRepository;
        this.categoryService = categoryService;
    }

    public StoreItemQuantity createStoreItemQuantity(StoreItemQuantity storeItemQuantity) {
        return storeItemRepository.save(storeItemQuantity);
    }

    public StoreItemQuantity getByProductId(UUID productId) {
        return storeItemRepository.findByProductId(productId);
    }

    public StoreItemQuantity updateStoreIdAndProductIdQuantity(int storeId, String productId, float quantity, boolean increment) {
        StoreItemQuantity storeItemQuantity = storeItemRepository.findByStoreIdAndProductId(storeId, UUID.fromString(productId));
        float newQuantity = quantity;
        if (increment)
            newQuantity += storeItemQuantity.getQuantity();
        storeItemQuantity.setQuantity(newQuantity);
        return storeItemRepository.save(storeItemQuantity);
    }

    public StoreItemQuantity updateStoreItemQuantity(StoreItemQuantity storeItemQuantity) {
        return storeItemRepository.save(storeItemQuantity);
    }

    public List<StoreItemQuantity> getProductsInAStore(int storeId) {
        return storeItemRepository.findAllByStoreId(storeId);
    }

    public List<StoreItemQuantity> getProductInStoreBelongingToACategory(int categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        return storeItemRepository.findAllByProduct_Type(category.getName());
    }

    public StoreItemQuantity getProductInAStore(int storeId, String productId) {
        return storeItemRepository.findByStoreIdAndProductId(storeId, UUID.fromString(productId));
    }

    public float getQuantity(int storeId, String productId) {
        StoreItemQuantity storeItemQuantity = storeItemRepository.findByStoreIdAndProductId(storeId, UUID.fromString(productId));
        return storeItemQuantity.getQuantity();
    }

}
