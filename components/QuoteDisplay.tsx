import React from 'react';
import quotes from '@/data/Quotes'; // Adjust the path

const QuoteDisplay = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { quote, author } = quotes[randomIndex];

  return (
    <div>
      <p className="text-md italic">"{quote}"</p>
      <p className="text-sm">- {author}</p>
    </div>
  );
};

export default QuoteDisplay;

