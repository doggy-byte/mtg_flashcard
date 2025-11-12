
import React, { useState, useEffect, useCallback } from 'react';
import { IMAGE_SETS } from './constants';
import Flashcard from './components/Flashcard';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};


const App: React.FC = () => {
  const [selectedSet, setSelectedSet] = useState<string>(Object.keys(IMAGE_SETS)[0]);
  const [shuffledUrls, setShuffledUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const urls = IMAGE_SETS[selectedSet] || [];
    setShuffledUrls(shuffleArray(urls));
    setCurrentIndex(0);
  }, [selectedSet]);

  const handleNextCard = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= shuffledUrls.length ? 0 : nextIndex;
    });
  }, [shuffledUrls.length]);

  if (shuffledUrls.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        Loading cards...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-gray-200 p-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Image Flashcards</h1>
        <p className="text-slate-400 mt-2">Guess the card, then reveal the full image!</p>
      </div>
      
      <div className="mb-6 w-full max-w-sm md:max-w-md">
        <label htmlFor="set-select" className="block text-sm font-medium text-slate-300 mb-2">
          Select Card Set:
        </label>
        <select
          id="set-select"
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
        >
          {Object.keys(IMAGE_SETS).map((setName) => (
            <option key={setName} value={setName}>
              {setName}
            </option>
          ))}
        </select>
      </div>

      <Flashcard
        key={`${selectedSet}-${currentIndex}`} // Use key to force re-mount and reset state on card change
        imageUrl={shuffledUrls[currentIndex]}
        onNext={handleNextCard}
      />
    </main>
  );
};

export default App;
