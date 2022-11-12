package com.neu.onestopgo.controllers;

import com.neu.onestopgo.models.Category;
import com.neu.onestopgo.models.Home;
import com.neu.onestopgo.models.Store;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HomeRestController {

    @GetMapping(path = "home")
    public Home getHome() {
        Store walmart = new Store(1, "Walmart", "https://s3.amazonaws.com/www-inside-design/uploads/2018/04/walmart-square.jpg");
        Category grocery = new Category(1, "Grocery", "Get Groceries and More");

        return new Home(1,
                List.of (walmart, walmart, walmart, walmart, walmart, walmart),
                List.of(grocery,grocery,grocery,grocery,grocery,grocery)
        );
    }

}
