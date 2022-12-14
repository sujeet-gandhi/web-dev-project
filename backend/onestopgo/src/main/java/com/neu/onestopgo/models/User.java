package com.neu.onestopgo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.util.Set;

@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "user_id")
  private int id;
  private String name;
  private String email;
  private boolean enabled;
  private String password;

  private String address;
  private String contact;
  private String type;
  private String imageUrl;

  // for store admins
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "store_id")
  @JsonIgnore
  private Store store;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  @JsonIgnore
  private Set<Order1> order1s;

  public String getName() {
    return name;
  }

  public User setName(String name) {
    this.name = name;
    return this;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public User setEmail(String email) {
    this.email = email;
    return this;
  }

  public String getPassword() {
    return password;
  }

  public User setPassword(String password) {
    this.password = password;
    return this;
  }

  public String getAddress() {
    return address;
  }

  public User setAddress(String address) {
    this.address = address;
    return this;
  }

  public String getContact() {
    return contact;
  }

  public User setContact(String contact) {
    this.contact = contact;
    return this;
  }

  public String getType() {
    return type;
  }

  public User setType(String type) {
    this.type = type;
    return this;
  }

  public Set<Order1> getOrder1s() {
    return order1s;
  }

  public User setOrder1s(Set<Order1> order1s) {
    this.order1s = order1s;
    return this;
  }

  public Store getStore() {
    return store;
  }

  public User setStore(Store store) {
    this.store = store;
    return this;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public User setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public User setEnabled(boolean enabled) {
    this.enabled = enabled;
    return this;
  }
}
