package com.moodmate.controller;

import com.moodmate.dto.MoodEntryRequest;
import com.moodmate.entity.MoodEntry;
import com.moodmate.service.MoodEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mood")
@CrossOrigin(origins = "*")
public class MoodEntryController {
    
    private final MoodEntryService moodEntryService;
    
    public MoodEntryController(MoodEntryService moodEntryService) {
        this.moodEntryService = moodEntryService;
    }
    
    @PostMapping("/entry")
    public ResponseEntity<MoodEntry> createMoodEntry(
            Authentication authentication,
            @Valid @RequestBody MoodEntryRequest request) {
        try {
            MoodEntry entry = moodEntryService.createMoodEntry(authentication.getName(), request);
            return ResponseEntity.ok(entry);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/entry/{id}")
    public ResponseEntity<MoodEntry> updateMoodEntry(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody MoodEntryRequest request) {
        try {
            MoodEntry entry = moodEntryService.updateMoodEntry(authentication.getName(), id, request);
            return ResponseEntity.ok(entry);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/entry/{id}")
    public ResponseEntity<Void> deleteMoodEntry(
            Authentication authentication,
            @PathVariable Long id) {
        try {
            moodEntryService.deleteMoodEntry(authentication.getName(), id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/entries")
    public ResponseEntity<List<MoodEntry>> getMoodEntries(Authentication authentication) {
        try {
            List<MoodEntry> entries = moodEntryService.getMoodEntriesByUser(authentication.getName());
            return ResponseEntity.ok(entries);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/entries/range")
    public ResponseEntity<List<MoodEntry>> getMoodEntriesByDateRange(
            Authentication authentication,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        try {
            List<MoodEntry> entries = moodEntryService.getMoodEntriesByDateRange(
                    authentication.getName(), startDate, endDate);
            return ResponseEntity.ok(entries);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/summary/weekly")
    public ResponseEntity<Map<String, Object>> getWeeklyMoodSummary(Authentication authentication) {
        try {
            Map<String, Object> summary = moodEntryService.getWeeklyMoodSummary(authentication.getName());
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 