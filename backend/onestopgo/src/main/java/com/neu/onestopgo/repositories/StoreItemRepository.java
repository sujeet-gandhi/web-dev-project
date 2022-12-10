package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.StoreItemQuantity;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface StoreItemRepository extends CrudRepository<StoreItemQuantity, UUID> {
  public StoreItemQuantity findByStoreIdAndProductId(int storeId, UUID productId);

  public List<StoreItemQuantity> findAllByStoreId(int storeId);

  public StoreItemQuantity findByProductId(UUID productId);

  public List<StoreItemQuantity> findAllByProduct_Type(String categoryName);
}
