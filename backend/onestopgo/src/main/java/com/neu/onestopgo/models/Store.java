package com.neu.onestopgo.models;

public class Store {
    private final int id;
    private final String name;
    private final String imageUrl;

    public Store(int id, String name, String imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
