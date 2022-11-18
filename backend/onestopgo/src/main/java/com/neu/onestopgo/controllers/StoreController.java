package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.StoreRequestObject;
import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/store")
public class StoreController {

    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public ResponseEntity<List<Store>> getAllStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    @PostMapping
    public ResponseEntity<Store> createStore(@RequestBody StoreRequestObject storeRequestObject) {
        return ResponseEntity.ok(storeService.createStore(storeRequestObject.getModelObject()));
    }
}
