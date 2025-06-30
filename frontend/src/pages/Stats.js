import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoodTrendChart from '../components/MoodTrendChart';
import MoodPieChart from '../components/MoodPieChart';

const Stats = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  let averages = { stress: '-', energy: '-', sleep: '-' };
  if (summary && summary.weeklyAverages) {
    const [stress, energy, sleep] = summary.weeklyAverages;
    averages = {
      stress: stress ? stress.toFixed(2) : '-',
      energy: energy ? energy.toFixed(2) : '-',
      sleep: sleep ? sleep.toFixed(2) : '-',
    };
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Mood Stats</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="bg-white rounded shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Weekly Mood Trend</h2>
            <MoodTrendChart entries={summary.entries || []} />
          </div>
          <div className="bg-white rounded shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Most Frequent Mood</h2>
            <MoodPieChart moodFrequency={summary.moodFrequency} />
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Weekly Averages</h2>
            <div className="flex gap-8 mt-2">
              <div>Stress: <span className="font-bold">{averages.stress}</span></div>
              <div>Energy: <span className="font-bold">{averages.energy}</span></div>
              <div>Sleep: <span className="font-bold">{averages.sleep} h</span></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats; 