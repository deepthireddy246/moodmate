package com.moodmate.service;

import com.moodmate.dto.MoodEntryRequest;
import com.moodmate.entity.MoodEntry;
import com.moodmate.entity.User;
import com.moodmate.repository.MoodEntryRepository;
import com.moodmate.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MoodEntryService {
    
    private final MoodEntryRepository moodEntryRepository;
    private final UserRepository userRepository;
    
    public MoodEntryService(MoodEntryRepository moodEntryRepository, UserRepository userRepository) {
        this.moodEntryRepository = moodEntryRepository;
        this.userRepository = userRepository;
    }
    
    public MoodEntry createMoodEntry(String username, MoodEntryRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        MoodEntry moodEntry = new MoodEntry();
        moodEntry.setUser(user);
        moodEntry.setDate(request.getDate());
        moodEntry.setMood(request.getMood());
        moodEntry.setStressLevel(request.getStressLevel());
        moodEntry.setEnergyLevel(request.getEnergyLevel());
        moodEntry.setSleepHours(request.getSleepHours());
        moodEntry.setNotes(request.getNotes());
        
        return moodEntryRepository.save(moodEntry);
    }
    
    public MoodEntry updateMoodEntry(String username, Long entryId, MoodEntryRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        MoodEntry moodEntry = moodEntryRepository.findById(entryId)
                .orElseThrow(() -> new RuntimeException("Mood entry not found"));
        
        // Verify the entry belongs to the user
        if (!moodEntry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this entry");
        }
        
        moodEntry.setDate(request.getDate());
        moodEntry.setMood(request.getMood());
        moodEntry.setStressLevel(request.getStressLevel());
        moodEntry.setEnergyLevel(request.getEnergyLevel());
        moodEntry.setSleepHours(request.getSleepHours());
        moodEntry.setNotes(request.getNotes());
        
        return moodEntryRepository.save(moodEntry);
    }
    
    public void deleteMoodEntry(String username, Long entryId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        MoodEntry moodEntry = moodEntryRepository.findById(entryId)
                .orElseThrow(() -> new RuntimeException("Mood entry not found"));
        
        // Verify the entry belongs to the user
        if (!moodEntry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this entry");
        }
        
        moodEntryRepository.delete(moodEntry);
    }
    
    public List<MoodEntry> getMoodEntriesByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        return moodEntryRepository.findByUserIdOrderByDateDesc(user.getId());
    }
    
    public List<MoodEntry> getMoodEntriesByDateRange(String username, LocalDate startDate, LocalDate endDate) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        return moodEntryRepository.findByUserIdAndDateBetweenOrderByDateDesc(user.getId(), startDate, endDate);
    }
    
    public Map<String, Object> getWeeklyMoodSummary(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);
        
        List<MoodEntry> weeklyEntries = moodEntryRepository.findByUserIdAndDateBetweenOrderByDateDesc(
                user.getId(), startDate, endDate);
        
        List<Object[]> moodFrequency = moodEntryRepository.findMoodFrequencyByUserId(user.getId());
        Object[] weeklyAverages = moodEntryRepository.findWeeklyAverages(user.getId(), startDate, endDate);
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("entries", weeklyEntries);
        summary.put("moodFrequency", moodFrequency);
        summary.put("weeklyAverages", weeklyAverages);
        summary.put("startDate", startDate);
        summary.put("endDate", endDate);
        
        return summary;
    }
} 