package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.StoreItemQuantity;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface StoreItemRepository extends CrudRepository<StoreItemQuantity, UUID> {
    public StoreItemQuantity findByStoreIdAndProductId(int storeId, String productId);
}
