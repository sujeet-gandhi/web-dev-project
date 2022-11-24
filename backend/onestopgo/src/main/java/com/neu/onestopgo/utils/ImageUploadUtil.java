package com.neu.onestopgo.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class ImageUploadUtil {
    // Inspiration from https://www.codejava.net/frameworks/spring-boot/spring-boot-file-upload-tutorial
    // This code is used to save the uploaded images to server
    public static void saveFileAndCreateDirectory(String directory, String fileName, MultipartFile fileToBeSaved) throws IOException {
        try {
            Path savePath = Paths.get(directory);
            if (Files.notExists(savePath))
                Files.createDirectories(savePath);

            Files.copy(fileToBeSaved.getInputStream(), savePath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new IOException("error creating image file : " + fileName, e);
        }
    }
}
