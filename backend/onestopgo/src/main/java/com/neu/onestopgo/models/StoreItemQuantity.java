package com.neu.onestopgo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.neu.onestopgo.response.StoreItemQuantityResponseObject;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"store_id", "product_id"})
})
public class StoreItemQuantity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "store_product_id", columnDefinition = "VARCHAR(255)")
    @Type(type = "uuid-char")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    @JsonIgnore
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private float quantity;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Store getStore() {
        return store;
    }

    public StoreItemQuantity setStore(Store store) {
        this.store = store;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public StoreItemQuantity setProduct(Product product) {
        this.product = product;
        return this;
    }

    public float getQuantity() {
        return quantity;
    }

    public StoreItemQuantity setQuantity(float quantity) {
        this.quantity = quantity;
        return this;
    }

    public StoreItemQuantityResponseObject getResponseObject() {
        return new StoreItemQuantityResponseObject(this.getId(), this.getStore().getId(), this.getProduct(), this.getQuantity(), this.getStore().getName());
    }

}
