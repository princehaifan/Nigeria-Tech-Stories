import React from 'react';
import type { Story } from '../types';
import { getToneLabel } from '../utils';
import ActionButton from './ActionButton';
import { CopyIcon, LikeIcon, RegenerateIcon, ReportIcon, SaveIcon, ShareIcon, ClockIcon, PenIcon, FlameIcon } from './Icons';

interface StoryDisplayProps {
  story: Story | null;
  onRegenerate: () => void;
  onSave: () => void;
  isLoading: boolean;
}

const StorySkeleton: React.FC = () => (
    <div className="w-full max-w-2xl bg-gray-800 border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-8 overflow-hidden">
        <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-4">
                <div className="h-6 w-28 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-32 bg-gray-700 rounded-full"></div>
            </div>
            <div className="mt-6 border-t border-gray-700/80 pt-6 space-y-4">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
        </div>
    </div>
);

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onRegenerate, onSave, isLoading }) => {
  if (isLoading && !story) {
    return <StorySkeleton />;
  }
    
  if (!story) {
    return null;
  }

  const readingTime = Math.max(1, Math.round(story.length / 225));
  const toneLabel = getToneLabel(story.tone);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: `Check out this story from Lagos Heat:\n\n"${story.title}"\n\n${story.text.substring(0, 150)}...`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
        handleCopy();
        alert('Share not supported, story copied to clipboard instead!');
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`"${story.title}"\n\n${story.text}`);
    alert('Story copied to clipboard!');
  };

  return (
    <div className="w-full max-w-2xl bg-gray-800 border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/30 p-6 sm:p-8 animate-fade-in overflow-hidden relative">
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.08)_0%,_rgba(251,191,36,0)_40%)] -z-0"></div>
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-amber-400 font-lora">{story.title}</h3>
        
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-700/50 rounded-full" title="Story Length">
            <PenIcon />
            <span>{`~${story.length} words`}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-700/50 rounded-full" title="Tone">
            <FlameIcon />
            <span>{toneLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-700/50 rounded-full" title="Estimated Reading Time">
            <ClockIcon />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700/80 pt-6 max-w-none text-gray-200 font-lora text-lg md:text-xl leading-loose tracking-wide text-justify whitespace-pre-wrap">
          {story.text}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
              <ActionButton icon={<LikeIcon />} label="Like" onClick={() => alert('Feedback recorded!')} />
              <ActionButton icon={<SaveIcon />} label="Save" onClick={onSave} variant="primary" />
              <ActionButton icon={<ShareIcon />} label="Share" onClick={handleShare} />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
              <ActionButton icon={<CopyIcon />} label="Copy" onClick={handleCopy} />
              <ActionButton icon={<RegenerateIcon />} label="Regen" onClick={onRegenerate} disabled={isLoading} />
              <ActionButton icon={<ReportIcon />} label="Report" onClick={() => alert('Story reported.')} variant="danger" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;