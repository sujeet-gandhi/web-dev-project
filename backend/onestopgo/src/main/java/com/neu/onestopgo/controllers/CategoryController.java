package com.neu.onestopgo.controllers;

import com.neu.onestopgo.dao.CategoryRequestObject;
import com.neu.onestopgo.models.Category;
import com.neu.onestopgo.services.CategoryService;
import com.neu.onestopgo.utils.ImageUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    private static final String CATEGORY_IMAGE_DIR = "images/category/";

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Category> createCategory(@RequestPart("image") MultipartFile multipartFile,
                                                   @RequestPart("category") CategoryRequestObject categoryRequestObject) throws IOException {
        String fileName = UUID.randomUUID() + "." + Objects.requireNonNull(multipartFile.getOriginalFilename()).split("\\.")[1];
        categoryRequestObject.setImageUrl(CATEGORY_IMAGE_DIR + fileName);
        ImageUploadUtil.saveFile(CATEGORY_IMAGE_DIR, fileName, multipartFile);
        return ResponseEntity.ok(categoryService.createCategory(categoryRequestObject.getModelObject()));
    }
}
