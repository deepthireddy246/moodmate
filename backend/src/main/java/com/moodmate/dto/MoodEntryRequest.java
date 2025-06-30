package com.moodmate.dto;

import com.moodmate.entity.MoodEntry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoodEntryRequest {
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    @NotNull(message = "Mood is required")
    private MoodEntry.MoodType mood;
    
    @NotNull(message = "Stress level is required")
    @Min(value = 1, message = "Stress level must be between 1 and 5")
    @Max(value = 5, message = "Stress level must be between 1 and 5")
    private Integer stressLevel;
    
    @NotNull(message = "Energy level is required")
    @Min(value = 1, message = "Energy level must be between 1 and 5")
    @Max(value = 5, message = "Energy level must be between 1 and 5")
    private Integer energyLevel;
    
    @Min(value = 0, message = "Sleep hours cannot be negative")
    @Max(value = 24, message = "Sleep hours cannot exceed 24")
    private Double sleepHours;
    
    private String notes;
    
    // Manual getters and setters
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public MoodEntry.MoodType getMood() {
        return mood;
    }
    
    public void setMood(MoodEntry.MoodType mood) {
        this.mood = mood;
    }
    
    public Integer getStressLevel() {
        return stressLevel;
    }
    
    public void setStressLevel(Integer stressLevel) {
        this.stressLevel = stressLevel;
    }
    
    public Integer getEnergyLevel() {
        return energyLevel;
    }
    
    public void setEnergyLevel(Integer energyLevel) {
        this.energyLevel = energyLevel;
    }
    
    public Double getSleepHours() {
        return sleepHours;
    }
    
    public void setSleepHours(Double sleepHours) {
        this.sleepHours = sleepHours;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
} 