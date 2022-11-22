package com.neu.onestopgo.dao;

import com.neu.onestopgo.models.Category;

public class CategoryRequestObject {
    private String name;

    private String description;

    private String imageUrl;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Category getModelObject() {
        return new Category()
                .setDescription(description)
                .setName(name)
                .setImageUrl(imageUrl);
    }
}
