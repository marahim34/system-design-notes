import { useState, useEffect } from 'react';

export function useReadProgress(totalChapters = 28) {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('sd_completed_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('sd_bookmarked_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sd_completed_chapters', JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem('sd_bookmarked_chapters', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleCompleted = (slug) => {
    setCompleted(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isCompleted = (slug) => completed.includes(slug);

  const toggleBookmark = (slug) => {
    setBookmarks(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isBookmarked = (slug) => bookmarks.includes(slug);

  const progressPercent = Math.round((completed.length / totalChapters) * 100);

  return {
    completed,
    toggleCompleted,
    isCompleted,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    progressPercent,
    completedCount: completed.length
  };
}
