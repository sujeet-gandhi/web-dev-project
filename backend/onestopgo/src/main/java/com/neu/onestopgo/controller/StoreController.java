package com.neu.onestopgo.controller;

import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/v1/")
public class StoreController {
    @Autowired
    private StoreService storeService;

    @PostMapping("/store")
    public ResponseEntity createStore(Store store) {
        return ResponseEntity.ok("Created Store of id : " + storeService.createStore(store));
    }
}
