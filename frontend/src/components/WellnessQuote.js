import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WellnessQuote = () => {
  const [quote, setQuote] = useState('');
  useEffect(() => {
    axios.get('/api/wellness/quote')
      .then(res => setQuote(res.data.quote))
      .catch(() => setQuote('Stay positive and take care of yourself!'));
  }, []);
  return (
    <div className="bg-primary-100 text-primary-800 rounded p-4 mb-6 text-center italic">
      {quote}
    </div>
  );
};

export default WellnessQuote; 