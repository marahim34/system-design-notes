import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChapterView from './components/ChapterView';
import TableOfContents from './components/TableOfContents';
import SearchModal from './components/SearchModal';
import BanglaGlossaryModal from './components/BanglaGlossaryModal';
import ResourcesView from './components/ResourcesView';
import { useTheme } from './hooks/useTheme';
import { useReadProgress } from './hooks/useReadProgress';

import chaptersIndex from './data/chapters-index.json';

// Use Vite glob to dynamically load individual chapter JSON files on demand
const chapterModules = import.meta.glob('./data/chapters/*.json');

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { completed, toggleCompleted, bookmarks, toggleBookmark } = useReadProgress(chaptersIndex.length);

  // Read initial chapter from URL hash or default to first chapter
  const [currentSlug, setCurrentSlug] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'resources') return 'resources';
      const found = chaptersIndex.find(c => c.slug === hash);
      if (found) return found.slug;
    }
    return chaptersIndex[0]?.slug || '01-scaling';
  });

  const [currentChapter, setCurrentChapter] = useState(null);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);

  // Active language tab: 'en', 'bn', or 'split'
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sd_active_tab');
      if (saved && ['en', 'bn', 'split'].includes(saved)) return saved;
    }
    return 'en';
  });

  // Filter state
  const [activeVolume, setActiveVolume] = useState(null); // null = All, 1 = Vol 1, 2 = Vol 2
  const [isResourcesActive, setIsResourcesActive] = useState(currentSlug === 'resources');
  const [fontSize, setFontSize] = useState('normal');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Save activeTab to localStorage
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    localStorage.setItem('sd_active_tab', newTab);
  };

  // Load chapter data when slug changes
  useEffect(() => {
    if (isResourcesActive) return;

    let isMounted = true;
    setIsLoadingChapter(true);

    const loader = chapterModules[`./data/chapters/${currentSlug}.json`];
    if (loader) {
      loader().then((module) => {
        if (isMounted) {
          setCurrentChapter(module.default || module);
          setIsLoadingChapter(false);
        }
      }).catch(err => {
        console.error('Error loading chapter:', err);
        if (isMounted) setIsLoadingChapter(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [currentSlug, isResourcesActive]);

  // Update URL hash when slug or resources changes
  const selectChapter = (slug) => {
    setIsResourcesActive(false);
    setCurrentSlug(slug);
    window.location.hash = slug;
  };

  const selectResources = () => {
    setIsResourcesActive(true);
    window.location.hash = 'resources';
  };

  const selectSection = (slug, sectionId) => {
    selectChapter(slug);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Keyboard shortcut: Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter chapters by volume
  const filteredChapters = useMemo(() => {
    if (!activeVolume) return chaptersIndex;
    return chaptersIndex.filter(c => c.volume === activeVolume);
  }, [activeVolume]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        activeVolume={activeVolume}
        onSelectVolume={setActiveVolume}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onSelectResources={selectResources}
        isResourcesActive={isResourcesActive}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Sidebar */}
        <Sidebar
          chapters={filteredChapters}
          currentSlug={currentSlug}
          onSelectChapter={selectChapter}
          completedSlugs={completed}
          onToggleCompleted={toggleCompleted}
          isOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isResourcesActive={isResourcesActive}
          onSelectResources={selectResources}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
        />

        {/* Center Content Area */}
        <main className="flex-1 min-w-0 flex flex-col">
          {isResourcesActive ? (
            <ResourcesView onSelectChapter={selectChapter} />
          ) : isLoadingChapter ? (
            <div className="flex-1 flex items-center justify-center p-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <ChapterView
              chapter={currentChapter}
              isCompleted={completed.includes(currentSlug)}
              onToggleCompleted={toggleCompleted}
              isBookmarked={bookmarks.includes(currentSlug)}
              onToggleBookmark={toggleBookmark}
              onSelectChapter={selectChapter}
              fontSize={fontSize}
              activeTab={activeTab}
              onChangeTab={handleTabChange}
            />
          )}
        </main>

        {/* Right Table of Contents (only for chapters) */}
        {!isResourcesActive && currentChapter && (
          <TableOfContents
            sections={currentChapter.sections}
            activeLanguage={activeTab}
          />
        )}

      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        chapters={chaptersIndex}
        onSelectChapter={selectChapter}
        onSelectSection={selectSection}
      />

      {/* Bangla Glossary Modal */}
      <BanglaGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        onSelectChapter={selectChapter}
      />

    </div>
  );
}
