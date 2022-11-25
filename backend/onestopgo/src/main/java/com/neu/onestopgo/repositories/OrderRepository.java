package com.neu.onestopgo.repositories;

import com.neu.onestopgo.models.Order1;
import com.neu.onestopgo.models.OrderState;
import com.neu.onestopgo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order1, UUID> {

    Order1 findFirstByUserAndState(User user, OrderState state);

    List<Order1> findAllByUserAndState(User user, OrderState state);

}
