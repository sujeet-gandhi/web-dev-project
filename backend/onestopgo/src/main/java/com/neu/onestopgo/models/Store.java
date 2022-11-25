package com.neu.onestopgo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neu.onestopgo.dao.GetAllStoresResponseObject;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.util.Set;

@Entity
@Indexed
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "store_id")
    private int id;

    @Field
    private String name;

    @Field
    private String location;

    @Field
    private String type;

    private String openingTime;
    private String closingTime;

    private String imageUrl;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "store_order",
            joinColumns = @JoinColumn(name = "store_id"),
            inverseJoinColumns = @JoinColumn(name = "order_id"))
    @JsonIgnore
    private Set<Order1> order1s;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<StoreItemQuantity> orderItemQuantitySet;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<User> storeAdmins;

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

    public String getOpeningTime() {
        return openingTime;
    }

    public Store setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
        return this;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public Store setClosingTime(String closingTime) {
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

    public Set<User> getStoreAdmins() {
        return storeAdmins;
    }

    public void setStoreAdmins(Set<User> storeAdmins) {
        this.storeAdmins = storeAdmins;
    }

    public GetAllStoresResponseObject getAllStoresResponseObject() {
        return new GetAllStoresResponseObject()
                .setId(id)
                .setName(name)
                .setLocation(location)
                .setType(type)
                .setOpeningTime(openingTime)
                .setClosingTime(closingTime)
                .setImageUrl(imageUrl)
                .setStoreAdmins(storeAdmins);
    }
}
