package com.moodmate.controller;

import com.moodmate.service.WellnessService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/wellness")
@CrossOrigin(origins = "*")
public class WellnessController {
    
    private final WellnessService wellnessService;
    
    public WellnessController(WellnessService wellnessService) {
        this.wellnessService = wellnessService;
    }
    
    @GetMapping("/quote")
    public ResponseEntity<Map<String, String>> getDailyQuote() {
        String quote = wellnessService.getDailyQuote();
        return ResponseEntity.ok(Map.of("quote", quote));
    }
} 