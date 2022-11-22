package com.neu.onestopgo.dao;

import com.neu.onestopgo.models.Product;

public class ProductRequestObject {
    private String name;

    private String description;

    private String unit;

    private double quantity;

    private boolean inStock;

    private float price;

    private String type;

    private String imageUrl;

    private int storeId;

    private float storeQuantity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public float getStoreQuantity() {
        return storeQuantity;
    }

    public void setStoreQuantity(float storeQuantity) {
        this.storeQuantity = storeQuantity;
    }

    public Product getModelObject() {
        return new Product()
                .setName(name)
                .setDescription(description)
                .setUnit(unit)
                .setQuantity(quantity)
                .setInStock(inStock)
                .setPrice(price)
                .setType(type)
                .setImageUrl(imageUrl);
    }
}
