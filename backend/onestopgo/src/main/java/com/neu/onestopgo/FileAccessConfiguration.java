package com.neu.onestopgo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class FileAccessConfiguration implements WebMvcConfigurer {
    // Inspiration from: https://www.codejava.net/frameworks/spring-boot/spring-boot-file-upload-tutorial
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry handlerRegistry) {
        exposeImagesFolder(handlerRegistry);
    }

    private void exposeImagesFolder(ResourceHandlerRegistry handlerRegistry) {
        Path imagesDirectoryPath = Paths.get("images");
        String uploadPath = imagesDirectoryPath.toFile().getAbsolutePath();

        handlerRegistry
                .addResourceHandler("/" + "images" + "/**")
                .addResourceLocations("file:/"+ uploadPath + "/");
    }
}