'use client';

import React, { useState, useEffect } from 'react';
import quotes from '@/data/Quotes';

const QuoteDisplay = () => {
  const [quote, setQuote] = useState({ quote: '', author: '' });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote.quote) return null; // Prevent flash of empty content

  return (
    <div>
      <p className="text-md italic">"{quote.quote}"</p>
      <p className="text-sm">- {quote.author}</p>
    </div>
  );
};

export default QuoteDisplay;
