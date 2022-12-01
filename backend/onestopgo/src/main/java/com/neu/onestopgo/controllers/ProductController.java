package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.ProductRequestObject;
import com.neu.onestopgo.models.Product;
import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.models.StoreItemQuantity;
import com.neu.onestopgo.response.StoreItemQuantityResponseObject;
import com.neu.onestopgo.services.CategoryService;
import com.neu.onestopgo.services.ProductService;
import com.neu.onestopgo.services.StoreItemService;
import com.neu.onestopgo.services.StoreService;
import com.neu.onestopgo.utils.ImageUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/product")
public class ProductController {

    private final static String PRODUCT_IMAGE_DIR = "images/product/";
    private final ProductService productService;

    private final StoreService storeService;

    private final StoreItemService storeItemService;

    private final CategoryService categoryService;

    @Autowired
    public ProductController(ProductService productService, StoreService storeService,
                             StoreItemService storeItemService, CategoryService categoryService) {
        this.productService = productService;
        this.storeService = storeService;
        this.storeItemService = storeItemService;
        this.categoryService = categoryService;
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<StoreItemQuantityResponseObject>> getAllProductsInAStore(@PathVariable("storeId") int storeId) {
        return ResponseEntity.ok(storeItemService.getProductsInAStore(storeId).stream().map((StoreItemQuantity::getResponseObject)).collect(Collectors.toList()));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity createProductWithQuantity(@RequestPart("image") MultipartFile multipartFile,
                                                    @RequestPart("product") ProductRequestObject productRequestObject) throws Exception {
        String fileName = UUID.randomUUID() + "." + Objects.requireNonNull(multipartFile.getOriginalFilename()).split("\\.")[1];
        productRequestObject.setImageUrl(PRODUCT_IMAGE_DIR + fileName);
        ImageUploadUtil.saveFileAndCreateDirectory(PRODUCT_IMAGE_DIR, fileName, multipartFile);

        Store store = storeService.getStoreById(productRequestObject.getStoreId());
        if (store == null)
            return ResponseEntity.badRequest().body("Invalid store id : " + productRequestObject.getStoreId());

        if (!categoryService.categoryExistsOrNot(productRequestObject.getType()))
            return ResponseEntity.badRequest().body("Invalid product type : " + productRequestObject.getType());

        Product newProduct = productService.createProduct(productRequestObject.getModelObject());
        StoreItemQuantity storeItemQuantity = new StoreItemQuantity()
                .setQuantity(productRequestObject.getStoreQuantity())
                .setProduct(newProduct)
                .setStore(store);
        storeItemService.createStoreItemQuantity(storeItemQuantity);

        return ResponseEntity.ok(storeItemQuantity);
    }

    @PutMapping
    public ResponseEntity updateProductWithQuantity(ProductRequestObject productRequestObject) {
        return ResponseEntity.ok(storeItemService.updateStoreIdAndProductIdQuantity(productRequestObject.getStoreId(),
                productRequestObject.getProductId(), productRequestObject.getStoreQuantity()));
    }
}
