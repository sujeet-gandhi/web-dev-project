package com.neu.onestopgo.response;

import com.neu.onestopgo.models.OrderState;

import java.util.List;
import java.util.UUID;

public class OrderResponseObject {

    private UUID id;

    private OrderState orderState;

    private List<OrderItemQuantityResponseObject> items;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public OrderState getOrderState() {
        return orderState;
    }

    public void setOrderState(OrderState orderState) {
        this.orderState = orderState;
    }

    public List<OrderItemQuantityResponseObject> getItems() {
        return items;
    }

    public void setItems(List<OrderItemQuantityResponseObject> items) {
        this.items = items;
    }

}
