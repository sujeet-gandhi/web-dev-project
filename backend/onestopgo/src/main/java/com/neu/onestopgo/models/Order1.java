package com.neu.onestopgo.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
public class Order1 {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "order_id", columnDefinition = "VARCHAR(255)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "store_order",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "store_id"))
    private Set<Store> stores;

    @OneToMany(mappedBy = "order1", fetch = FetchType.LAZY)
    private Set<OrderItemQuantity> orderItemQuantitySet;

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
}
