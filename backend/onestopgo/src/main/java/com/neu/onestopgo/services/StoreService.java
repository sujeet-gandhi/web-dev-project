package com.neu.onestopgo.services;

import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.repositories.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreService {
    @Autowired
    private StoreRepository storeRepository;

    public int createStore(Store store) {
        Store createdStore = storeRepository.saveAndFlush(store);
        return createdStore.getId();
    }
}
