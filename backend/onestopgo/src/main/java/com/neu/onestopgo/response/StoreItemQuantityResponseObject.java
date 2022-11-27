package com.neu.onestopgo.response;

import com.neu.onestopgo.models.Product;

import java.util.UUID;

public class StoreItemQuantityResponseObject {

    private UUID id;

    private Product product;

    private int storeId;

    private float quantity;

    public StoreItemQuantityResponseObject(UUID id, int storeId, Product product, float quantity) {
        this.id = id;
        this.storeId = storeId;
        this.product = product;
        this.quantity = quantity;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }
}
