package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.OrderItemQuantity;
import com.neu.onestopgo.models.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderItemQuantityRepository extends JpaRepository<OrderItemQuantity, UUID> {

    public List<OrderItemQuantity> findAllByStore(Store store);

}
