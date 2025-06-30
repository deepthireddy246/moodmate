package com.moodmate.repository;

import com.moodmate.entity.MoodEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {
    
    List<MoodEntry> findByUserIdOrderByDateDesc(Long userId);
    
    List<MoodEntry> findByUserIdAndDateBetweenOrderByDateDesc(
        Long userId, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT m.mood, COUNT(m) FROM MoodEntry m WHERE m.user.id = :userId GROUP BY m.mood ORDER BY COUNT(m) DESC")
    List<Object[]> findMoodFrequencyByUserId(@Param("userId") Long userId);
    
    @Query("SELECT AVG(m.stressLevel), AVG(m.energyLevel), AVG(m.sleepHours) FROM MoodEntry m WHERE m.user.id = :userId AND m.date BETWEEN :startDate AND :endDate")
    Object[] findWeeklyAverages(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
} 