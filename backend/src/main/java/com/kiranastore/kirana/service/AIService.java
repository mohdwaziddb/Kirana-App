package com.kiranastore.kirana.service;

import org.springframework.stereotype.Service;

@Service
public class AIService {

    public String parseTextToJson(String inputText) {

        // normalize separators
        inputText = inputText
                .replace(",", "\n")
                .replace(";", "\n")
                .replace("-", " ")
                .replace("=", " ")
                .replaceAll("\\s+", " ");

        String[] lines = inputText.split("\\n");

        StringBuilder json = new StringBuilder("[");
        int count = 0;

        for (String line : lines) {

            line = line.trim();
            if (line.isEmpty()) continue;

            String[] parts = line.split(" ");

            String name = parts[0];
            String qty = "1";

            if (parts.length >= 2) {
                qty = parts[1];
                if (parts.length >= 3) {
                    qty = parts[1] + parts[2]; // "2 kg" → "2kg"
                }
            }

            if (count > 0) json.append(",");

            json.append("{\"name\":\"")
                    .append(name.toLowerCase())
                    .append("\",\"quantity\":\"")
                    .append(qty)
                    .append("\"}");

            count++;
        }

        json.append("]");
        return json.toString();
    }
}