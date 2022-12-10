package com.neu.onestopgo.dao;

import com.neu.onestopgo.models.User;

import java.util.Set;

public class GetAllStoresResponseObject {
  private int id;

  private String name;

  private String location;

  private String type;

  private String openingTime;
  private String closingTime;

  private String imageUrl;

  private Set<User> storeAdmins;

  public int getId() {
    return id;
  }

  public GetAllStoresResponseObject setId(int id) {
    this.id = id;
    return this;
  }

  public String getName() {
    return name;
  }

  public GetAllStoresResponseObject setName(String name) {
    this.name = name;
    return this;
  }

  public String getLocation() {
    return location;
  }

  public GetAllStoresResponseObject setLocation(String location) {
    this.location = location;
    return this;
  }

  public String getType() {
    return type;
  }

  public GetAllStoresResponseObject setType(String type) {
    this.type = type;
    return this;
  }

  public String getOpeningTime() {
    return openingTime;
  }

  public GetAllStoresResponseObject setOpeningTime(String openingTime) {
    this.openingTime = openingTime;
    return this;
  }

  public String getClosingTime() {
    return closingTime;
  }

  public GetAllStoresResponseObject setClosingTime(String closingTime) {
    this.closingTime = closingTime;
    return this;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public GetAllStoresResponseObject setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  public Set<User> getStoreAdmins() {
    return storeAdmins;
  }

  public GetAllStoresResponseObject setStoreAdmins(Set<User> storeAdmins) {
    this.storeAdmins = storeAdmins;
    return this;
  }
}
