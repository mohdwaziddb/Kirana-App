package com.kiranastore.kirana.service;

import net.sourceforge.tess4j.Tesseract;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class OCRService {

    public String extractTextFromImage(File file) {

        try {
            Tesseract tesseract = new Tesseract();

            // ⚠️ CHANGE THIS PATH
            tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata");

            tesseract.setLanguage("eng");

            return tesseract.doOCR(file);

        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}