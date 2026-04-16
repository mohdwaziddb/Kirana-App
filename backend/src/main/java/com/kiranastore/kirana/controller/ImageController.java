package com.kiranastore.kirana.controller;

import com.kiranastore.kirana.dto.ItemRequest;
import com.kiranastore.kirana.dto.ItemResponse;
import com.kiranastore.kirana.service.ItemProcessingService;
import com.kiranastore.kirana.service.MatchingService;
import com.kiranastore.kirana.service.OCRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ImageController {

    @Autowired
    private final OCRService ocrService;

    private final ItemProcessingService itemService;
    private final MatchingService matchingService;

    public ImageController(OCRService ocrService,
                           ItemProcessingService itemService,
                           MatchingService matchingService) {
        this.ocrService = ocrService;
        this.itemService = itemService;
        this.matchingService = matchingService;
    }

    @PostMapping("/upload-image")
    public List<ItemResponse> uploadImage(@RequestParam("file") MultipartFile file) {

        String text = ocrService.extractText(file);

        List<ItemRequest> items = itemService.processOCRText(text);

        return matchingService.matchItems(items);
    }
}