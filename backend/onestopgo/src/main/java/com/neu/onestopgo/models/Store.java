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

    private String imageUrl;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    private Set<Order1> order1s;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    private Set<StoreItemQuantity> orderItemQuantitySet;

    public int getId() {
        return id;
    }

    public Store setId(int id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Store setName(String name) {
        this.name = name;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public Store setLocation(String location) {
        this.location = location;
        return this;
    }

    public String getType() {
        return type;
    }

    public Store setType(String type) {
        this.type = type;
        return this;
    }

    public Date getOpeningTime() {
        return openingTime;
    }

    public Store setOpeningTime(Date openingTime) {
        this.openingTime = openingTime;
        return this;
    }

    public Date getClosingTime() {
        return closingTime;
    }

    public Store setClosingTime(Date closingTime) {
        this.closingTime = closingTime;
        return this;
    }

    public Set<Order1> getOrders() {
        return order1s;
    }

    public Store setOrders(Set<Order1> order1s) {
        this.order1s = order1s;
        return this;
    }

    public Set<StoreItemQuantity> getOrderItemQuantitySet() {
        return orderItemQuantitySet;
    }

    public Store setOrderItemQuantitySet(Set<StoreItemQuantity> orderItemQuantitySet) {
        this.orderItemQuantitySet = orderItemQuantitySet;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Store setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public Set<Order1> getOrder1s() {
        return order1s;
    }

    public Store setOrder1s(Set<Order1> order1s) {
        this.order1s = order1s;
        return this;
    }
}
