import React, { useState } from 'react';
import axios from 'axios';
import EditMoodModal from './EditMoodModal';

const MoodEntryItem = ({ entry, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this mood entry?')) {
      return;
    }
    
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/mood/entry/${entry.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
    } catch (err) {
      alert('Failed to delete mood entry');
    } finally {
      setDeleting(false);
    }
  };

  const moodEmojis = {
    HAPPY: '😊',
    SAD: '😢',
    NEUTRAL: '😐',
    EXCITED: '🤩',
    ANXIOUS: '😰',
    CALM: '😌',
    FRUSTRATED: '😠',
    GRATEFUL: '🙏',
  };

  return (
    <>
      <li className="mb-2 border-b pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="font-semibold">
              {entry.date} - {moodEmojis[entry.mood] || ''} {entry.mood}
            </div>
            <div className="text-sm text-gray-600">
              Stress: {entry.stressLevel}, Energy: {entry.energyLevel}, Sleep: {entry.sleepHours}h
            </div>
            {entry.notes && <div className="mt-1 text-sm">{entry.notes}</div>}
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </li>
      
      <EditMoodModal
        entry={entry}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default MoodEntryItem; 