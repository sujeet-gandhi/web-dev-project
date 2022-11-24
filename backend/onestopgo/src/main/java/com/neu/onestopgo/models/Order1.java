package com.neu.onestopgo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

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
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "store_order",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "store_id"))
    @JsonIgnore
    private Set<Store> stores;

    @OneToMany(mappedBy = "order1", fetch = FetchType.LAZY)
    @JsonIgnore
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
