package com.neu.onestopgo.controllers;

import com.neu.onestopgo.models.User;
import com.neu.onestopgo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/signup")
public class SignupController {

    @Autowired
    UserService userService;
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity createNewUserFromSignUp(@RequestBody User user) {
        userService.createNewUserFromSignUp(user);
        return ResponseEntity.ok(user);
    }
}
