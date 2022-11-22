package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.ProductRequestObject;
import com.neu.onestopgo.models.Product;
import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.models.StoreItemQuantity;
import com.neu.onestopgo.services.ProductService;
import com.neu.onestopgo.services.StoreItemService;
import com.neu.onestopgo.services.StoreService;
import com.neu.onestopgo.utils.ImageUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.UUID;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/product")
public class ProductController {

    private final static String PRODUCT_IMAGE_DIR = "images/product/";
    private final ProductService productService;

    private final StoreService storeService;

    private final StoreItemService storeItemService;

    @Autowired
    public ProductController(ProductService productService, StoreService storeService, StoreItemService storeItemService) {
        this.productService = productService;
        this.storeService = storeService;
        this.storeItemService = storeItemService;
    }


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity createProductWithQuantity(@RequestPart("image") MultipartFile multipartFile,
                                                             @RequestPart("product") ProductRequestObject productRequestObject) throws Exception {
        String fileName = UUID.randomUUID() + "." + Objects.requireNonNull(multipartFile.getOriginalFilename()).split("\\.")[1];
        productRequestObject.setImageUrl(PRODUCT_IMAGE_DIR + fileName);
        ImageUploadUtil.saveFile(PRODUCT_IMAGE_DIR, fileName, multipartFile);

        Store store =  storeService.getStoreById(productRequestObject.getStoreId());
        if (store == null)
            return ResponseEntity.badRequest().body("Invalid store id : " + productRequestObject.getStoreId());

        Product newProduct = productService.createProduct(productRequestObject.getModelObject());
        StoreItemQuantity storeItemQuantity = new StoreItemQuantity()
                .setQuantity(productRequestObject.getStoreQuantity())
                .setProduct(newProduct)
                .setStore(store);
        storeItemService.createStoreItemQuantity(storeItemQuantity);

        return ResponseEntity.ok("created");
    }
}
