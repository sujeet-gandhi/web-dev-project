package com.neu.onestopgo.controllers;

import com.neu.onestopgo.constants.StringConstants;
import com.neu.onestopgo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/success")
    public ResponseEntity<Map<String, Object>> loginSuccess(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
       response.put(StringConstants.LOGGED_IN_USER,session.getAttribute(StringConstants.LOGGED_IN_USER));
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/username", method = RequestMethod.GET)
    @ResponseBody
    public String currentUserName(Authentication authentication) {
        return authentication.getName();
    }

    @RequestMapping(value = "/userdata", method = RequestMethod.GET)
    public ResponseEntity currentUserData(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserDataFromUserName(authentication.getName()));
    }

    @GetMapping(path = "/failure")
    public ResponseEntity loginFailure(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
