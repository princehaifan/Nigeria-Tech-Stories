
import React from 'react';
import { BookOpenIcon, LogoIcon } from './Icons';

interface HeaderProps {
  onShowSaved: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowSaved }) => {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 border-b border-gray-700/50 flex justify-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-20">
      <div className="container mx-auto max-w-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Lagos Heat
          </h1>
        </div>
        <button
          onClick={onShowSaved}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-amber-500"
        >
          <BookOpenIcon />
          <span className="hidden sm:inline">Saved Stories</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
