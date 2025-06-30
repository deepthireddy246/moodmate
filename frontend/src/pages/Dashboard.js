import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MoodTrendChart from '../components/MoodTrendChart';
import MoodPieChart from '../components/MoodPieChart';
import WellnessQuote from '../components/WellnessQuote';
import MoodEntryItem from '../components/MoodEntryItem';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/mood/summary/weekly', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSummary(res.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Mood Dashboard</h1>
      <WellnessQuote />
      <div className="mb-6 flex gap-4">
        <Link to="/add-mood" className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition">Add Mood Entry</Link>
        <Link to="/stats" className="bg-primary-100 text-primary-700 px-4 py-2 rounded hover:bg-primary-200 transition">View Stats</Link>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">This Week's Mood Trend</h2>
              <MoodTrendChart entries={summary.entries || []} />
            </div>
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">Most Frequent Mood</h2>
              <MoodPieChart moodFrequency={summary.moodFrequency} />
            </div>
          </div>
          <div className="bg-white rounded shadow p-4 mt-6">
            <h2 className="text-xl font-semibold mb-2">Journal Entries</h2>
            <div>
              {(summary.entries && summary.entries.length > 0) ? (
                <ul>
                  {summary.entries.map(entry => (
                    <MoodEntryItem
                      key={entry.id}
                      entry={entry}
                      onUpdate={fetchSummary}
                    />
                  ))}
                </ul>
              ) : (
                <div className="text-gray-400">No journal entries for this week.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 