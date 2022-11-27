package com.neu.onestopgo.controllers;

import com.neu.onestopgo.services.CategoryService;
import com.neu.onestopgo.services.ProductService;
import com.neu.onestopgo.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
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

    @GetMapping(path = "/search")
    public ResponseEntity<Map<String, Object>> search(@PathParam("searchTerm") String searchTerm) {
        Map<String, Object> response = new HashMap<>();

        try {
            response.put("searchTerm", searchTerm);
            response.put("products", productService.performProductSearch(searchTerm));
            response.put("stores", storeService.performStoreSearch(searchTerm));
            response.put("categories", categoryService.performCategorySearch(searchTerm));
        } catch (Exception ex) {
            // here you should handle unexpected errors
            // ...
            // throw ex;
        }

        return ResponseEntity.ok(response);
    }

//    @GetMapping
//    @RequestMapping(value = {"logout"},method = RequestMethod.GET)
//    public ResponseEntity Logout(HttpServletRequest request, SessionStatus
//            status, HttpSession session, HttpServletResponse response){
//        session.invalidate();
//        Cookie[] cookies = request.getCookies();
//        if(cookies!=null) {
//            for (Cookie cookie : cookies) {
//                cookie.setMaxAge(0);
//                cookie.setValue(null);
//                cookie.setPath("/");
//                response.addCookie(cookie);
//            }
//        }
//        request.getSession().invalidate();
//        return new ResponseEntity(HttpStatus.OK);
//    }

}
