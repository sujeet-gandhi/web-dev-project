package com.neu.onestopgo.response;

import com.neu.onestopgo.models.OrderState;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OrderResponseObject {

    private UUID id;

    private OrderState orderState;

    private List<OrderItemQuantityResponseObject> items;

    private Date orderDate;

    private Date orderDeliveryDate;

    private float orderTotal;

    private String userEmail;

    private int userId;

    public float getOrderTotal() {
        return orderTotal;
    }

    public void setOrderTotal(float orderTotal) {
        this.orderTotal = orderTotal;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getOrderDeliveryDate() {
        return orderDeliveryDate;
    }

    public void setOrderDeliveryDate(Date orderDeliveryDate) {
        this.orderDeliveryDate = orderDeliveryDate;
    }

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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
