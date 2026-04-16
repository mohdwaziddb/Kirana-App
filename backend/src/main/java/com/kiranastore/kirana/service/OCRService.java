package com.kiranastore.kirana.service;

import net.sourceforge.tess4j.Tesseract;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class OCRService {

    public String extractText(MultipartFile file) {

        try {
            File temp = File.createTempFile("upload", ".jpg");
            file.transferTo(temp);

            Tesseract tesseract = new Tesseract();

// 🔥 EXACT folder jahan traineddata hai
            tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata");

            tesseract.setLanguage("eng+hin"); // ya "eng+hin"

            return tesseract.doOCR(temp);

        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}