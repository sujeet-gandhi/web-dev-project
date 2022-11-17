package com.neu.onestopgo.dao;

import com.neu.onestopgo.models.User;

public class UserRequestObject {
    private String email;
    private String password;
    private String address;
    private String contact;
    private int storeId;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }
    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public User getModelObject() {
        return new User()
                .setEmail(this.email)
                .setPassword(this.password)
                .setActive(true)
                .setAddress(this.address)
                .setContact(this.contact);
    }
}