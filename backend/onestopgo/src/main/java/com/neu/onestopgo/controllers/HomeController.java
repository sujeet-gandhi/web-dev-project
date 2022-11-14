package com.neu.onestopgo.controllers;

import com.neu.onestopgo.services.CategoryService;
import com.neu.onestopgo.services.ProductService;
import com.neu.onestopgo.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class HomeController {

    private final StoreService storeService;

    private final CategoryService categoryService;

    private final ProductService productService;

    @Autowired
    public HomeController(StoreService storeService, CategoryService categoryService, ProductService productService) {
        this.storeService = storeService;
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @GetMapping(path = "/home")
    public ResponseEntity<Map<String, Object>> getHome() {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", 1);
        response.put("stores", storeService.getAllStores());
        response.put("categories", categoryService.getAllCategories());

        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/search/{searchTerm}")
    public ResponseEntity<Map<String, Object>> searchGlobal(@PathVariable String searchTerm) {
        Map<String, Object> response = new HashMap<>();

        response.put("userId", 1);

        response.put("stores", storeService.performStoreSearch(searchTerm));
        response.put("categories", categoryService.performCategorySearch(searchTerm));
        response.put("products", productService.performProductSearch(searchTerm));

        return ResponseEntity.ok(response);
    }

}
