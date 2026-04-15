package com.kiranastore.kirana.service;

import com.kiranastore.kirana.dto.ItemRequest;
import com.kiranastore.kirana.dto.ItemResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemProcessingService {

    private final MatchingService matchingService;

    public ItemProcessingService(MatchingService matchingService) {
        this.matchingService = matchingService;
    }

    public List<ItemResponse> processText(String inputText) {

        try {
            // 🔥 Step 1: Normalize input
            inputText = inputText
                    .replace(",", "\n")
                    .replace(";", "\n")
                    .replace("-", " ")
                    .replace("=", " ")
                    .replaceAll("\\s+", " ");

            String[] lines = inputText.split("\\n");

            List<ItemRequest> items = new ArrayList<>();

            // 🔥 Step 2: Parse manually
            for (String line : lines) {

                line = line.trim();
                if (line.isEmpty()) continue;

                String[] parts = line.split("\\s+");

                String name = "";
                String quantity = "1";

                StringBuilder nameBuilder = new StringBuilder();

                for (int i = 0; i < parts.length; i++) {

                    String word = parts[i];

                    // 🔥 check if number exists
                    if (word.matches(".*\\d.*")) {

                        quantity = word;

                        // handle "2 kg"
                        if (i + 1 < parts.length && parts[i + 1].matches("[a-zA-Z]+")) {
                            quantity = word + parts[i + 1];
                            i++; // skip next word
                        }

                    } else {
                        nameBuilder.append(word).append(" ");
                    }
                }

                name = nameBuilder.toString().trim().toLowerCase();

                ItemRequest item = new ItemRequest();
                item.setName(name);
                item.setQuantity(quantity);

                items.add(item);
            }

            // 🔥 Step 3: Matching + pricing (same as before)
            return matchingService.matchItems(items);

        } catch (Exception e) {

            List<ItemResponse> errorList = new ArrayList<>();

            ItemResponse error = new ItemResponse();
            error.setName("Error parsing items");
            error.setQuantity("-");
            error.setPrice(null);
            error.setTotal(null);
            error.setMatched(false);

            errorList.add(error);

            return errorList;
        }
    }
}