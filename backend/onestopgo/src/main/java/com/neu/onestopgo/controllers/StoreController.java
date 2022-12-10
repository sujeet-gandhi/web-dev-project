package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.GetAllStoresResponseObject;
import com.neu.onestopgo.dao.StoreRequestObject;
import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.services.StoreService;
import com.neu.onestopgo.utils.ImageUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/store")
public class StoreController {

  private static final String STORE_IMAGE_DIR = "images/stores/";
  private final StoreService storeService;

  @Autowired
  public StoreController(StoreService storeService) {
    this.storeService = storeService;
  }

  @GetMapping
  public ResponseEntity<List<GetAllStoresResponseObject>> getAllStores() {
    return ResponseEntity.ok(storeService
            .getAllStores()
            .stream()
            .map(Store::getAllStoresResponseObject)
            .collect(Collectors.toList()));
  }

  @GetMapping("/{storeId}")
  public ResponseEntity getStoreFromId(@PathVariable int storeId) {
    return ResponseEntity.ok(storeService.getStoreById(storeId));
  }

  @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
  public ResponseEntity<Store> createStore(@RequestPart("store") StoreRequestObject storeRequestObject,
                                           @RequestPart("image") MultipartFile multipartFile) throws IOException {
    String fileName = UUID.randomUUID() + "." + Objects.requireNonNull(multipartFile.getOriginalFilename()).split("\\.")[1];
    storeRequestObject.setImageUrl(STORE_IMAGE_DIR + fileName);
    ImageUtil.saveFileAndCreateDirectory(STORE_IMAGE_DIR, fileName, multipartFile);
    return ResponseEntity.ok(storeService.createStore(storeRequestObject.getModelObject()));
  }
}
