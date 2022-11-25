package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.OrderItemQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderItemQuantityRepository extends JpaRepository<OrderItemQuantity, UUID> {

}
