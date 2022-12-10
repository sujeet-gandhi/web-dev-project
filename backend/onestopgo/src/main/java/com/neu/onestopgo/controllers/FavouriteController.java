package com.neu.onestopgo.controllers;

import com.neu.onestopgo.services.FavouriteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/favourite")
public class FavouriteController {

  @Autowired
  private FavouriteService favouriteService;

  @GetMapping("/mark/store/{storeId}")
  public ResponseEntity markStoreAsFavourite(@PathVariable int storeId, Authentication authentication) {
    return ResponseEntity.ok(favouriteService.markStoreAsFavourite(storeId, authentication.getName()));
  }

  @GetMapping("/mark/product/{productId}")
  public ResponseEntity markStoreAsFavourite(@PathVariable String productId, Authentication authentication) {
    return ResponseEntity.ok(favouriteService.markProductAsFavourite(productId, authentication.getName()));
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity getAllFavouritesOfUser(@PathVariable int userId) {
    return ResponseEntity.ok(favouriteService.getAllFavouriteOfUsers(userId));
  }

  @GetMapping("/user/store/{storeId}")
  public ResponseEntity getUsersWhoLikeThisStore(@PathVariable int storeId) {
    return ResponseEntity.ok(favouriteService.getUsersWhoLikeGivenStore(storeId));
  }
}
