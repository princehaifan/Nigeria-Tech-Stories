
import React, { useState } from 'react';
import StoryGenerator from './components/StoryGenerator';
import Header from './components/Header';
import SavedStories from './components/SavedStories';
import { LagosSkylineIcon } from './components/Icons';

const App: React.FC = () => {
  const [isSavedStoriesVisible, setIsSavedStoriesVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header onShowSaved={() => setIsSavedStoriesVisible(true)} />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative">
        <div className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 text-gray-800 opacity-50 z-0">
          <LagosSkylineIcon />
        </div>
        <div className="container mx-auto max-w-2xl w-full z-10">
          <StoryGenerator />
        </div>
      </main>
      
      {isSavedStoriesVisible && <SavedStories onClose={() => setIsSavedStoriesVisible(false)} />}
      
      <footer className="text-center p-4 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Lagos Heat. All stories are AI-generated fiction.</p>
      </footer>
    </div>
  );
};

export default App;
