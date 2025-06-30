package com.moodmate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mood_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MoodEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MoodType mood;
    
    @Column(name = "stress_level", nullable = false)
    private Integer stressLevel; // 1-5
    
    @Column(name = "energy_level", nullable = false)
    private Integer energyLevel; // 1-5
    
    @Column(name = "sleep_hours")
    private Double sleepHours;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Manual getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public MoodType getMood() {
        return mood;
    }
    
    public void setMood(MoodType mood) {
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
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public enum MoodType {
        HAPPY, SAD, NEUTRAL, EXCITED, ANXIOUS, CALM, FRUSTRATED, GRATEFUL
    }
} 