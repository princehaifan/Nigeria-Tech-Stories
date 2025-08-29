import React, { useState, useCallback } from 'react';
import { generateStory } from '../services/geminiService';
import { saveStory } from '../services/storageService';
import type { Story } from '../types';
import Controls from './Controls';
import StoryDisplay from './StoryDisplay';
import { SparklesIcon } from './Icons';

const StoryGenerator: React.FC = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [length, setLength] = useState<number>(300);
  const [tone, setTone] = useState<number>(0.5); // Default to slightly spicy

  const handleGenerateStory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newStory = await generateStory(length, tone);
      setStory(newStory);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
      setStory(null);
    } finally {
      setIsLoading(false);
    }
  }, [length, tone]);
  
  const handleRegenerate = () => {
      handleGenerateStory();
  }

  const handleSaveStory = useCallback(() => {
    if (story) {
      const success = saveStory(story);
      if (success) {
        alert('Story saved!');
      } else {
        alert('This story is already saved.');
      }
    }
  }, [story]);

  return (
    <div className="w-full flex flex-col items-center gap-8 py-8">
      {!story && !isLoading && (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">Ready for Some Lagos Heat?</h2>
            <p className="text-gray-400 mt-2">Adjust your settings and tap the button for a fresh story.</p>
        </div>
      )}
      
      <Controls length={length} setLength={setLength} tone={tone} setTone={setTone} isDisabled={isLoading} />
      
      <button
        onClick={handleGenerateStory}
        disabled={isLoading}
        className="relative group w-48 h-48 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex flex-col items-center justify-center text-white font-bold text-lg shadow-2xl shadow-red-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        <span className="absolute inset-0 bg-black/20 rounded-full group-hover:bg-black/10 transition-colors"></span>
        {isLoading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        ) : (
          <div className="relative text-center">
            <SparklesIcon className="w-8 h-8 mb-2 mx-auto" />
            <span className="block">Tap for</span>
            <span className="block">Lagos Heat</span>
          </div>
        )}
      </button>

      {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
      
      <StoryDisplay story={story} onRegenerate={handleRegenerate} onSave={handleSaveStory} isLoading={isLoading} />
    </div>
  );
};

export default StoryGenerator;
