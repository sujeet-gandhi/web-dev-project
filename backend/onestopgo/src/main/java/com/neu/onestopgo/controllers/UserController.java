package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.UserDAO;
import com.neu.onestopgo.models.User;
import com.neu.onestopgo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserFromId(@PathVariable int userId) {
        return ResponseEntity.ok(userService.getUserFromId(userId));
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody UserDAO userDAO) {
        return ResponseEntity.ok(userService.createNewUser(userDAO));
    }

    @PostMapping("/storeadmin")
    public ResponseEntity createStoreAdmin(@RequestBody UserDAO userDAO) {
        try {
            User storeAdmin = userService.createNewStoreAdmin(userDAO);
            return ResponseEntity.ok(storeAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
