package com.neu.onestopgo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;

import java.util.UUID;

@Entity
public class Favourite {
  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
  @Column(name = "favourite_id", columnDefinition = "VARCHAR(255)")
  @Type(type = "uuid-char")
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  @JsonIgnore
  private Product favouriteProduct;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "store_id")
  @JsonIgnore
  private Store favouriteStore;

  public UUID getId() {
    return id;
  }

  public Favourite setId(UUID id) {
    this.id = id;
    return this;
  }

  public User getUser() {
    return user;
  }

  public Favourite setUser(User user) {
    this.user = user;
    return this;
  }

  public Product getFavouriteProduct() {
    return favouriteProduct;
  }

  public Favourite setFavouriteProduct(Product favouriteProduct) {
    this.favouriteProduct = favouriteProduct;
    return this;
  }

  public Store getFavouriteStore() {
    return favouriteStore;
  }

  public Favourite setFavouriteStore(Store favouriteStore) {
    this.favouriteStore = favouriteStore;
    return this;
  }
}
