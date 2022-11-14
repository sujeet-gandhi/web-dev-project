package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {

    private final StoreRepository storeRepository;

    @Autowired
    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public List<Store> getAllStores() {
        return (List<Store>) storeRepository.findAll();
    }

    public Store getStoreById(int storeId) {
        return storeRepository.findById(storeId).orElse(null);
    }

    public Store createStore(Store store) {
        return storeRepository.save(store);
    }

    public List<Store> performStoreSearch(String searchTerm) {
        return (List<Store>) storeRepository.findAll();
    }

}
