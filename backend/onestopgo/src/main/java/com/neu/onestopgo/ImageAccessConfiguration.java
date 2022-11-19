package com.neu.onestopgo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class ImageAccessConfiguration implements WebMvcConfigurer {
    // inspiration from https://www.codejava.net/frameworks/spring-boot/spring-boot-file-upload-tutorial

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        exposeDirectory("images", registry);
    }

    private void exposeDirectory(String dirName, ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get(dirName);
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/" + dirName + "/**").addResourceLocations("file:/"+ uploadPath + "/");
    }
}