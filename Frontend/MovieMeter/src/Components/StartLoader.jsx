import React, { useEffect, useState } from 'react';

const messages = [
  "Connecting to movie universe...",
  "Gathering legendary titles...",
  "Syncing film reels...",
  "Almost there! Setting the stage...",
  "Final touch: polishing the popcorn..."
];

const StartLoader = ({ interval = 5000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950 text-white transition-all w-full">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mb-6" />
      <p className="text-lg text-center max-w-md opacity-80 px-4 transition-all duration-500">
        {messages[index]}
      </p>
    </div>
  );
};

export default StartLoader;
