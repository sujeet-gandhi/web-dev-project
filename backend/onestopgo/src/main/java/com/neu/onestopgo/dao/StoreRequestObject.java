package com.neu.onestopgo.dao;

import com.neu.onestopgo.models.Store;

import java.util.Date;

public class StoreRequestObject {
    private String name;
    private String location;
    private String type;

    private String openingTime;

    private String closingTime;
    private String imageUrl;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Store getModelObject() {
        return new Store()
                .setName(this.name)
                .setLocation(this.location)
                .setType(this.type)
                .setOpeningTime(this.openingTime)
                .setClosingTime(this.closingTime)
                .setImageUrl(this.imageUrl);
    }
}
