package com.neu.onestopgo.controllers;

import com.neu.onestopgo.models.Category;
import com.neu.onestopgo.models.Store;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class HomeController {

    @GetMapping(path = "/home")
    public ResponseEntity getHome() {
        Store walmart = new Store()
                .setId(1)
                .setName("Walmart")
                .setImageUrl("https://s3.amazonaws.com/www-inside-design/uploads/2018/04/walmart-square.jpg");

        Category grocery = new Category(1, "Grocery", "Get Groceries and More");

        Map<String, Object> response = new HashMap<>();
        response.put("userId", 1);
        response.put("stores", List.of(walmart, walmart, walmart, walmart, walmart, walmart));
        response.put("categories", List.of(grocery, grocery, grocery, grocery, grocery, grocery));

        return ResponseEntity.ok(response);
    }

}
