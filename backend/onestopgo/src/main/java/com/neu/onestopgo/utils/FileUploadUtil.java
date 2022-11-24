package com.neu.onestopgo.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUploadUtil {
    // Inspiration from https://www.codejava.net/frameworks/spring-boot/spring-boot-file-upload-tutorial
    public static void saveFileAndCreateDirectory(String uploadDirectory, String fileName, MultipartFile fileToBeSaved) throws IOException {
        Path path = Paths.get(uploadDirectory);

        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        try {
            Files.copy(fileToBeSaved.getInputStream(),
                    path.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new IOException("error creating image file : " + fileName, e);
        }
    }
}
