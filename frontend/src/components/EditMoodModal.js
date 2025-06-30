import React, { useState } from 'react';
import axios from 'axios';

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

const EditMoodModal = ({ entry, isOpen, onClose, onUpdate }) => {
  const [date, setDate] = useState(entry?.date || '');
  const [mood, setMood] = useState(entry?.mood || '');
  const [stressLevel, setStressLevel] = useState(entry?.stressLevel || 3);
  const [energyLevel, setEnergyLevel] = useState(entry?.energyLevel || 3);
  const [sleepHours, setSleepHours] = useState(entry?.sleepHours || 8);
  const [notes, setNotes] = useState(entry?.notes || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/mood/entry/${entry.id}`, {
        date,
        mood,
        stressLevel,
        energyLevel,
        sleepHours,
        notes,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update mood entry');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Mood Entry</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-500 text-white py-2 rounded font-semibold hover:bg-primary-600 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Entry'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMoodModal; 