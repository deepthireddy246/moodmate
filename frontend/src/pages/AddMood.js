import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const moodOptions = [
  { value: 'HAPPY', label: '😊 Happy' },
  { value: 'SAD', label: '😢 Sad' },
  { value: 'NEUTRAL', label: '😐 Neutral' },
  { value: 'EXCITED', label: '🤩 Excited' },
  { value: 'ANXIOUS', label: '😰 Anxious' },
  { value: 'CALM', label: '😌 Calm' },
  { value: 'FRUSTRATED', label: '😠 Frustrated' },
  { value: 'GRATEFUL', label: '🙏 Grateful' },
];

const AddMood = () => {
  const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [stressLevel, setStressLevel] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [sleepHours, setSleepHours] = useState(8);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/mood/entry', {
        date,
        mood,
        stressLevel,
        energyLevel,
        sleepHours,
        notes,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Mood entry added!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add mood entry');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Mood Entry</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Mood</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={mood}
            onChange={e => setMood(e.target.value)}
            required
          >
            <option value="">Select mood</option>
            {moodOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Stress Level</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full border rounded px-3 py-2"
            value={stressLevel}
            onChange={e => setStressLevel(Number(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Energy Level</label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full border rounded px-3 py-2"
            value={energyLevel}
            onChange={e => setEnergyLevel(Number(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Sleep Hours</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.1"
            className="w-full border rounded px-3 py-2"
            value={sleepHours}
            onChange={e => setSleepHours(Number(e.target.value))}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Notes (Journal)</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
          />
        </div>
        <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded font-semibold hover:bg-primary-600 transition">Add Entry</button>
      </form>
    </div>
  );
};

export default AddMood; 