package com.moodmate.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class WellnessService {
    
    private final List<String> wellnessQuotes = List.of(
        "Every day is a new beginning. Take a deep breath and start again.",
        "You are stronger than you think. Keep going!",
        "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
        "It's okay to not be okay. Just don't give up.",
        "You don't have to be perfect to be amazing.",
        "Take it one day at a time. You've got this!",
        "Your feelings are valid. Your experiences matter. You matter.",
        "Self-care is not selfish. It's essential.",
        "You are capable of amazing things. Believe in yourself.",
        "Progress, not perfection. Every step forward counts.",
        "You are enough. You are worthy. You are loved.",
        "Take care of your body. It's the only place you have to live.",
        "Your mind is a garden. Your thoughts are the seeds. You can grow flowers or you can grow weeds.",
        "The only way to do great work is to love what you do.",
        "Happiness is not something ready-made. It comes from your own actions."
    );
    
    private final Random random = new Random();
    
    public String getDailyQuote() {
        return wellnessQuotes.get(random.nextInt(wellnessQuotes.size()));
    }
} 