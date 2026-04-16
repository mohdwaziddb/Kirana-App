package com.kiranastore.kirana.service;

import com.kiranastore.kirana.dto.ItemResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageProcessingService {

    private final OCRService ocrService;
    private final ItemProcessingService itemProcessingService;

    public List<ItemResponse> processImage(MultipartFile file) {

        try {
            String extractedText = ocrService.extractText(file);

            System.out.println("OCR TEXT: " + extractedText);

            return itemProcessingService.processText(extractedText);

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}