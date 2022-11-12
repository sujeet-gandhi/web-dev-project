package com.neu.onestopgo.models;

import java.util.List;

public class Home {

    private final int userId;
    private final List<Store> stores;
    private final List<Category> categories;

    public Home(int userId, List<Store> stores, List<Category> categories) {
        this.userId = userId;
        this.stores = stores;
        this.categories = categories;
    }


    public int getUserId() {
        return userId;
    }

    public List<Store> getStores() {
        return stores;
    }

    public List<Category> getCategories() {
        return categories;
    }
}
