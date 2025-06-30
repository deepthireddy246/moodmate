import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const moodColors = {
  HAPPY: '#10b981',
  SAD: '#6b7280',
  NEUTRAL: '#f59e0b',
  EXCITED: '#ef4444',
  ANXIOUS: '#8b5cf6',
  CALM: '#3b82f6',
  FRUSTRATED: '#f97316',
  GRATEFUL: '#84cc16',
};

const moodLabels = {
  HAPPY: 'Happy',
  SAD: 'Sad',
  NEUTRAL: 'Neutral',
  EXCITED: 'Excited',
  ANXIOUS: 'Anxious',
  CALM: 'Calm',
  FRUSTRATED: 'Frustrated',
  GRATEFUL: 'Grateful',
};

const MoodPieChart = ({ moodFrequency }) => {
  const data = (moodFrequency || []).map(([mood, count]) => ({
    name: moodLabels[mood] || mood,
    value: count,
    color: moodColors[mood] || '#8884d8',
  }));
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MoodPieChart; 