
import type { Story } from '../types';

const STORAGE_KEY = 'lagosHeatSavedStories';

export const getSavedStories = (): Story[] => {
  try {
    const savedStoriesJson = localStorage.getItem(STORAGE_KEY);
    if (savedStoriesJson) {
      return JSON.parse(savedStoriesJson);
    }
  } catch (error) {
    console.error("Failed to parse saved stories from localStorage", error);
    localStorage.removeItem(STORAGE_KEY);
  }
  return [];
};

export const saveStory = (story: Story): boolean => {
  if (!story || !story.title) {
    return false;
  }
  const savedStories = getSavedStories();
  
  const isDuplicate = savedStories.some(
    s => s.title === story.title && s.text.substring(0, 50) === story.text.substring(0, 50)
  );

  if (isDuplicate) {
    return false; // Indicate that it was a duplicate and not saved
  }

  const updatedStories = [story, ...savedStories];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStories));
  return true; // Indicate success
};

export const removeStory = (storyToRemove: Story): void => {
    const savedStories = getSavedStories();
    const updatedStories = savedStories.filter(
        s => s.title !== storyToRemove.title || s.text !== storyToRemove.text
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStories));
};
