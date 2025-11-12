import React, { useState, useEffect } from 'react';
import { EyeIcon, ArrowRightIcon } from './icons';

interface FlashcardProps {
  imageUrl: string;
  onNext: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ imageUrl, onNext }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsRevealed(false);
  }, [imageUrl]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const cardHeight = isRevealed ? 'h-[32rem] md:h-[36rem]' : 'h-64 md:h-72';
  const imageVisibility = isLoading ? 'opacity-0' : 'opacity-100';

  return (
    <div className="w-full max-w-sm md:max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-4 flex flex-col items-center">
      <div className="w-full mb-4">
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 focus:ring-offset-slate-900 transition-all duration-300"
          aria-label="Next Card"
        >
         <span>Next Card</span>
         <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div
        onClick={!isRevealed && !isLoading ? handleReveal : undefined}
        className={`relative w-full ${cardHeight} overflow-hidden rounded-lg bg-slate-900/50 transition-all duration-700 ease-in-out ${!isRevealed && !isLoading ? 'cursor-pointer group' : ''}`}
        role={!isRevealed && !isLoading ? "button" : undefined}
        aria-label={!isRevealed && !isLoading ? "Reveal image" : undefined}
        tabIndex={!isRevealed && !isLoading ? 0 : -1}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isRevealed && !isLoading) {
            handleReveal();
          }
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        <img
          src={imageUrl}
          alt="Flashcard content (partially hidden)"
          className={`w-full h-auto min-h-full object-cover object-top transition-opacity duration-500 ${imageVisibility}`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)} // Handle image load error
        />
        {!isRevealed && !isLoading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="text-center text-white p-4 rounded-lg">
              <EyeIcon className="w-12 h-12 mx-auto" />
              <p className="font-bold text-lg mt-2 tracking-wide">Click to Reveal</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Flashcard;