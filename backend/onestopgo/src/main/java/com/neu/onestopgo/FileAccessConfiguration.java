package com.neu.onestopgo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class FileAccessConfiguration implements WebMvcConfigurer {
    // Inspiration from: https://www.codejava.net/frameworks/spring-boot/spring-boot-file-upload-tutorial
    // This code is used to configure spring boot to server images from the /images path
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry handlerRegistry) {
        exposeImagesFolder(handlerRegistry);
    }

    private void exposeImagesFolder(ResourceHandlerRegistry handlerRegistry) {
        handlerRegistry
                .addResourceHandler("/" + "images" + "/**")
                .addResourceLocations("file:" +
                        Paths.get("images")
                                .toFile()
                                .getAbsolutePath() + "/");
    }
}