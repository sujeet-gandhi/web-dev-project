package com.neu.onestopgo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neu.onestopgo.response.OrderResponseObject;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
public class Order1 {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "order_id", columnDefinition = "VARCHAR(255)")
    @Type(type = "uuid-char")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "store_order",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "store_id"))
    @JsonIgnore
    private Set<Store> stores;

    private OrderState state;

    @OneToMany(mappedBy = "order1", fetch = FetchType.LAZY)
    private Set<OrderItemQuantity> orderItemQuantitySet;

    private Date orderDate;

    private Date orderDeliveryDate;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Store> getStores() {
        return stores;
    }

    public void setStores(Set<Store> stores) {
        this.stores = stores;
    }

    public Set<OrderItemQuantity> getOrderItemQuantitySet() {
        return orderItemQuantitySet;
    }

    public void setOrderItemQuantitySet(Set<OrderItemQuantity> orderItemQuantitySet) {
        this.orderItemQuantitySet = orderItemQuantitySet;
    }

    public OrderState getState() {
        return state;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public OrderResponseObject getResponseObject() {
        OrderResponseObject orderResponseObject = new OrderResponseObject();
        orderResponseObject.setId(this.getId());
        orderResponseObject.setOrderState(this.getState());
        orderResponseObject.setItems(this.getOrderItemQuantitySet()
                .stream()
                .map(OrderItemQuantity::getResponseObject)
                .collect(Collectors.toList()));
        return orderResponseObject;
    }

}
