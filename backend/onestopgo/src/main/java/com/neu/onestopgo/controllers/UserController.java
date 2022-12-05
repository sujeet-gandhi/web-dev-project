package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.UserRequestObject;
import com.neu.onestopgo.models.User;
import com.neu.onestopgo.services.UserService;
import com.neu.onestopgo.utils.ImageUtil;
import com.neu.onestopgo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.UUID;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private static final String USER_IMAGE_DIR = "images/user/";
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

    @GetMapping("/username/{username}")
    public ResponseEntity getUserfromUserName(@PathVariable String username) {
        try {
            return ResponseEntity.ok(userService.getUserFromUserName(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody UserRequestObject userRequestObject) {
        return ResponseEntity.ok(userService.createNewUser(userRequestObject));
    }

    @PutMapping(path = "/{userId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity updateUserProfile(@RequestPart("image") MultipartFile multipartFile,
                                            @RequestPart("user") UserRequestObject userRequestObject, @PathVariable int userId) {
        try {
            String fileName = UUID.randomUUID() + "." + Objects.requireNonNull(multipartFile.getOriginalFilename()).split("\\.")[1];
            userRequestObject.setImageUrl(USER_IMAGE_DIR + fileName);
            ImageUtil.saveFileAndCreateDirectory(USER_IMAGE_DIR, fileName, multipartFile);

            String existingImageUrlForDeletion = userService.getExistingImageUrlOfUser(userId);
            if (!Utils.IsNullOrEmpty(existingImageUrlForDeletion))
                ImageUtil.removeFileFromDirectory(USER_IMAGE_DIR, existingImageUrlForDeletion);

            return ResponseEntity.ok(userService.updateUserProfile(userRequestObject, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(path = "/storeadmin", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity createStoreAdmin(@RequestPart("image") MultipartFile multipartFile,
                                           @RequestPart("storeadmin") UserRequestObject userRequestObject) {
        try {
            String fileName = UUID.randomUUID() + "." + Objects.requireNonNull(multipartFile.getOriginalFilename()).split("\\.")[1];
            userRequestObject.setImageUrl(USER_IMAGE_DIR + fileName);
            ImageUtil.saveFileAndCreateDirectory(USER_IMAGE_DIR, fileName, multipartFile);

            return ResponseEntity.ok(userService.createNewStoreAdmin(userRequestObject));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
