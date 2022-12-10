package com.neu.onestopgo.response;

import com.neu.onestopgo.models.Product;

import java.util.UUID;

public class StoreItemQuantityResponseObject {

  private UUID id;

  private Product product;

  private int storeId;

  private float quantity;

  private String storeName;

  public StoreItemQuantityResponseObject(UUID id, int storeId, Product product, float quantity, String storeName) {
    this.id = id;
    this.storeId = storeId;
    this.product = product;
    this.quantity = quantity;
    this.storeName = storeName;
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

  public String getStoreName() {
    return storeName;
  }

  public void setStoreName(String storeName) {
    this.storeName = storeName;
  }
}
