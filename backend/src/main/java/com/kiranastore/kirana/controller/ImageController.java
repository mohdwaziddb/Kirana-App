package com.kiranastore.kirana.controller;

import com.kiranastore.kirana.dto.ItemResponse;
import com.kiranastore.kirana.service.ImageProcessingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ImageController {

    private final ImageProcessingService imageProcessingService;

    @PostMapping("/upload-image")
    public List<ItemResponse> uploadImage(@RequestParam("file") MultipartFile file) {
        return imageProcessingService.processImage(file);
    }
}