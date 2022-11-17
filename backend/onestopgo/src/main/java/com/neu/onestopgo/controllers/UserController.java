package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.UserRequestObject;
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
    public ResponseEntity getUserFromId(@PathVariable int userId) {
        try {
            return ResponseEntity.ok(userService.getUserFromId(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody UserRequestObject userRequestObject) {
        return ResponseEntity.ok(userService.createNewUser(userRequestObject));
    }

    @PostMapping("/storeadmin")
    public ResponseEntity createStoreAdmin(@RequestBody UserRequestObject userRequestObject) {
        try {
            User storeAdmin = userService.createNewStoreAdmin(userRequestObject);
            return ResponseEntity.ok(storeAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
