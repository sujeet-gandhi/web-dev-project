package com.neu.onestopgo.dao;

import java.util.List;
import java.util.Map;

public class UserResponseObject {
  private int id;
  private String name;
  private String email;
  private boolean enabled;
  private String password;
  private String address;
  private String contact;
  private String type;
  private String imageUrl;
  public Map<String, List<Object>> favourites;

  public String getName() {
    return name;
  }

  public UserResponseObject setName(String name) {
    this.name = name;
    return this;
  }

  public int getId() {
    return id;
  }

  public UserResponseObject setId(int id) {
    this.id = id;
    return this;
  }

  public String getEmail() {
    return email;
  }

  public UserResponseObject setEmail(String email) {
    this.email = email;
    return this;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public UserResponseObject setEnabled(boolean enabled) {
    this.enabled = enabled;
    return this;
  }

  public String getPassword() {
    return password;
  }

  public UserResponseObject setPassword(String password) {
    this.password = password;
    return this;
  }

  public String getAddress() {
    return address;
  }

  public UserResponseObject setAddress(String address) {
    this.address = address;
    return this;
  }

  public String getContact() {
    return contact;
  }

  public UserResponseObject setContact(String contact) {
    this.contact = contact;
    return this;
  }

  public String getType() {
    return type;
  }

  public UserResponseObject setType(String type) {
    this.type = type;
    return this;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public UserResponseObject setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  public Map<String, List<Object>> getFavourites() {
    return favourites;
  }

  public UserResponseObject setFavourites(Map<String, List<Object>> favourites) {
    this.favourites = favourites;
    return this;
  }
}
