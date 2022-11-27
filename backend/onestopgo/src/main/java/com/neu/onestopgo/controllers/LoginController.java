package com.neu.onestopgo.controllers;

import com.neu.onestopgo.constants.StringConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/login")
public class LoginController {
    @GetMapping(path = "/success")
    public ResponseEntity<Map<String, Object>> loginSuccess(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
       response.put(StringConstants.LOGGED_IN_USER,session.getAttribute(StringConstants.LOGGED_IN_USER));
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/failure")
    public ResponseEntity loginFailure(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
