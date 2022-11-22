package com.neu.onestopgo.services;

import com.neu.onestopgo.models.StoreItemQuantity;
import com.neu.onestopgo.repositories.StoreItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreItemService {

    private final StoreItemRepository storeItemRepository;

    @Autowired
    public StoreItemService(StoreItemRepository storeItemRepository){
        this.storeItemRepository = storeItemRepository;
    }

    public StoreItemQuantity createStoreItemQuantity(StoreItemQuantity storeItemQuantity) {
        return storeItemRepository.save(storeItemQuantity);
    }

    public StoreItemQuantity updateStoreIdAndProductIdQuantity(int storeId, String productId, float quantity) {
        StoreItemQuantity storeItemQuantity = storeItemRepository.findByStoreIdAndProductId(storeId, productId);
        storeItemQuantity.setQuantity(storeItemQuantity.getQuantity() + quantity);
        return storeItemRepository.save(storeItemQuantity);
    }
}
