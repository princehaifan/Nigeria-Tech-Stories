import React from 'react';
import { getToneLabel } from '../utils';

interface ControlsProps {
  length: number;
  setLength: (length: number) => void;
  tone: number;
  setTone: (tone: number) => void;
  isDisabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ length, setLength, tone, setTone, isDisabled }) => {

  const toneLabel = getToneLabel(tone);

  return (
    <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
            <label htmlFor="length" className="block text-sm font-medium text-gray-300">
                Story Length
            </label>
            <span className="px-2 py-1 text-xs font-semibold text-amber-300 bg-amber-900/50 rounded-full">
                ~{length} words
            </span>
        </div>
        <input
          id="length"
          type="range"
          min="200"
          max="3000"
          step="50"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
          disabled={isDisabled}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500"
        />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label htmlFor="tone" className="block text-sm font-medium text-gray-300">
            Tone
          </label>
          <span className="px-2 py-1 text-xs font-bold text-amber-300 bg-amber-900/50 rounded-full">{toneLabel}</span>
        </div>
        <input
          id="tone"
          type="range"
          min="-1"
          max="1"
          step="0.1"
          value={tone}
          onChange={(e) => setTone(parseFloat(e.target.value))}
          disabled={isDisabled}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500"
        />
      </div>
    </div>
  );
};

export default Controls;
