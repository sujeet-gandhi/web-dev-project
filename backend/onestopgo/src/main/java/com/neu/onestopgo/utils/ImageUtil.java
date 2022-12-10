package com.neu.onestopgo.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class ImageUtil {
  // Inspiration from https://www.codejava.net/frameworks/spring-boot/spring-boot-file-upload-tutorial
  // This code is used to save the uploaded images to server
  public static void saveFileAndCreateDirectory(String directory, String fileNameToBeUploaded, MultipartFile fileToBeSaved) throws IOException {
    try {
      Path savePath = Paths.get(directory);
      if (Files.notExists(savePath))
        Files.createDirectories(savePath);

      Files.copy(fileToBeSaved.getInputStream(), savePath.resolve(fileNameToBeUploaded), StandardCopyOption.REPLACE_EXISTING);
    } catch (Exception e) {
      throw new IOException("error creating image file : " + fileNameToBeUploaded, e);
    }
  }

  public static void removeFileFromDirectory(String directory, String fileToBeDeleted) throws IOException {
    try {
      Path deletePath = Paths.get(directory);
      if (Files.notExists(deletePath))
        throw new Exception("file does not exist : " + fileToBeDeleted);

      Files.delete(deletePath.resolve(fileToBeDeleted));
    } catch (Exception e) {
      throw new IOException("error deleting image file : " + fileToBeDeleted, e);
    }
  }
}
