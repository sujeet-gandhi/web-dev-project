package com.neu.onestopgo.models;

/**
 * Represents the state of an order - an order in 'IN_CART' state corresponds to a order that is being built.
 */
public enum OrderState {
  IN_CART,
  PLACED,
  DELIVERED,
  CANCELLED
}
