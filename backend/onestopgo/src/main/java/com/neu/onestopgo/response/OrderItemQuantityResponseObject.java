package com.neu.onestopgo.response;

import com.neu.onestopgo.models.Product;
import com.neu.onestopgo.models.Store;

import java.util.UUID;

public class OrderItemQuantityResponseObject {

    private UUID id;

    private Product product;

    private float quantity;

    private String storeName;

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

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
}
