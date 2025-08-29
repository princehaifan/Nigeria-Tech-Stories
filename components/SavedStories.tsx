import React, { useState, useEffect } from 'react';
import { getSavedStories, removeStory } from '../services/storageService';
import type { Story } from '../types';
import { getToneLabel } from '../utils';
import { XIcon, TrashIcon } from './Icons';

interface SavedStoriesProps {
  onClose: () => void;
}

const SavedStories: React.FC<SavedStoriesProps> = ({ onClose }) => {
  const [savedStories, setSavedStories] = useState<Story[]>([]);

  useEffect(() => {
    setSavedStories(getSavedStories());
  }, []);

  const handleDelete = (story: Story) => {
    removeStory(story);
    setSavedStories(getSavedStories()); // Re-fetch to update the UI
  };

  return (
    <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-stories-title"
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <header className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
          <h2 id="saved-stories-title" className="text-xl font-bold text-amber-400">Saved Stories</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="Close saved stories"
          >
            <XIcon />
          </button>
        </header>
        <main className="flex-grow overflow-y-auto p-4 sm:p-6">
          {savedStories.length > 0 ? (
            <ul className="space-y-6">
              {savedStories.map((story, index) => (
                <li key={`${story.title}-${index}`} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/50">
                   <div className="flex justify-between items-start gap-4">
                     <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-100 font-lora mb-3">{story.title}</h3>
                        {story.length && typeof story.tone !== 'undefined' && (
                          <div className="flex items-center flex-wrap gap-2 mb-4 text-xs text-gray-400">
                            <span className="px-2 py-1 bg-gray-700/70 rounded-full">{`~${story.length} words`}</span>
                            <span className="px-2 py-1 bg-gray-700/70 rounded-full">{getToneLabel(story.tone)} Tone</span>
                          </div>
                        )}
                     </div>
                     <button
                        onClick={() => handleDelete(story)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label={`Delete story: ${story.title}`}
                     >
                        <TrashIcon />
                     </button>
                   </div>
                  <p className="text-gray-300 font-lora leading-relaxed whitespace-pre-wrap">{story.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
              <p className="text-lg">No stories saved yet.</p>
              <p className="mt-2 text-sm">When you save a story, it will appear here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SavedStories;
