package com.neu.onestopgo.dao;

public class OrderItemQuantityRequestObject {

  private String productId;

  private float quantity;

  private int storeId;

  private String orderItemQuantityId;

  public String getOrderItemQuantityId() {
    return orderItemQuantityId;
  }

  public void setOrderItemQuantityId(String orderItemQuantityId) {
    this.orderItemQuantityId = orderItemQuantityId;
  }

  public int getStoreId() {
    return storeId;
  }

  public void setStoreId(int storeId) {
    this.storeId = storeId;
  }

  public String getProductId() {
    return productId;
  }

  public void setProductId(String productId) {
    this.productId = productId;
  }

  public float getQuantity() {
    return quantity;
  }

  public void setQuantity(float quantity) {
    this.quantity = quantity;
  }

}
