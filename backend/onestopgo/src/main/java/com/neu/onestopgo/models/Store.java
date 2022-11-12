package com.neu.onestopgo.models;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "store_id")
    private int id;

    private String name;

    private String location;
    private String type;

    private Date openingTime;
    private Date closingTime;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    private Set<Order1> order1s;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    private Set<StoreItemQuantity> orderItemQuantitySet;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(Date openingTime) {
        this.openingTime = openingTime;
    }

    public Date getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(Date closingTime) {
        this.closingTime = closingTime;
    }

    public Set<Order1> getOrders() {
        return order1s;
    }

    public void setOrders(Set<Order1> order1s) {
        this.order1s = order1s;
    }

    public Set<StoreItemQuantity> getOrderItemQuantitySet() {
        return orderItemQuantitySet;
    }

    public void setOrderItemQuantitySet(Set<StoreItemQuantity> orderItemQuantitySet) {
        this.orderItemQuantitySet = orderItemQuantitySet;
    }
}
