package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.ProductRequestObject;
import com.neu.onestopgo.models.Product;
import com.neu.onestopgo.models.Store;
import com.neu.onestopgo.models.StoreItemQuantity;
import com.neu.onestopgo.response.StoreItemQuantityResponseObject;
import com.neu.onestopgo.services.*;
import com.neu.onestopgo.utils.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    private final UserService userService;

    @Autowired
    public ProductController(ProductService productService, StoreService storeService,
                             StoreItemService storeItemService, CategoryService categoryService, UserService userService) {
        this.productService = productService;
        this.storeService = storeService;
        this.storeItemService = storeItemService;
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @GetMapping("/storeadmin")
    public ResponseEntity<List<StoreItemQuantityResponseObject>> getAllProductsOfStoreAdmin(Authentication authentication) {
        return ResponseEntity.ok(storeItemService
                .getProductsInAStore(userService.getStoreIdOfStoreAdmin(authentication.getName()))
                .stream()
                .map((StoreItemQuantity::getResponseObject))
                .collect(Collectors.toList()));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<StoreItemQuantityResponseObject>> getAllProductsInAStore(@PathVariable("storeId") int storeId) {
        return ResponseEntity.ok(storeItemService.getProductsInAStore(storeId).stream().map((StoreItemQuantity::getResponseObject)).collect(Collectors.toList()));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<StoreItemQuantityResponseObject>> getAllProductsInACategory(@PathVariable("categoryId") int categoryId) {
        return ResponseEntity.ok(storeItemService
                .getProductInStoreBelongingToACategory(categoryId)
                .stream()
                .map((StoreItemQuantity::getResponseObject))
                .collect(Collectors.toList()));
    }

    @GetMapping("/single/{productId}")
    public ResponseEntity getProductFromId(@PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.getProductById(UUID.fromString(productId)));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity createProductWithQuantity(@RequestPart("image") MultipartFile multipartFile,
                                                    @RequestPart("product") ProductRequestObject productRequestObject,
                                                    Authentication authentication) throws Exception {
        String fileName = UUID.randomUUID() + "." + Objects.requireNonNull(multipartFile.getOriginalFilename()).split("\\.")[1];
        productRequestObject.setImageUrl(PRODUCT_IMAGE_DIR + fileName);
        ImageUtil.saveFileAndCreateDirectory(PRODUCT_IMAGE_DIR, fileName, multipartFile);

        Store store = userService.getUserFromUserName(authentication.getName()).getStore();
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
    public ResponseEntity updateProductWithQuantity(@RequestBody ProductRequestObject productRequestObject,
                                                    Authentication authentication) {
        return ResponseEntity.ok(
                storeItemService.updateStoreIdAndProductIdQuantity(
                        userService.getStoreIdOfStoreAdmin(authentication.getName()),
                        productRequestObject.getProductId(),
                        productRequestObject.getStoreQuantity(),
                        true
                )
        );
    }
}
