import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Github, 
  Menu, 
  X, 
  BookOpen, 
  Type
} from 'lucide-react';

export default function Header({
  onOpenSearch,
  isDark,
  onToggleTheme,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  activeVolume,
  onSelectVolume,
  onOpenGlossary,
  onSelectResources,
  isResourcesActive,
  fontSize,
  onChangeFontSize
}) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-6 max-w-7xl mx-auto">
        
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle Navigation Sidebar"
            className="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex-shrink-0"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5 text-indigo-500" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2 group min-w-0">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm sm:shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-white tracking-tight text-sm sm:text-base md:text-lg truncate">
                  System Design Notes
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50">
                  Vol 1 & 2
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-bn hidden lg:block leading-none">
                বাংলা ও ইংরেজি সমন্বিত ইন্টারভিউ গাইড
              </p>
            </div>
          </a>
        </div>

        {/* Center: Search & Desktop Volume Filter */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 flex-shrink-0" />
            <span className="hidden sm:inline">Search chapters...</span>
            <span className="inline sm:hidden text-[11px]">Search</span>
            <kbd className="hidden lg:inline-block ml-1.5 px-1 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Desktop Volume Filter Pills */}
          <div className="hidden lg:flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs">
            <button
              onClick={() => onSelectVolume(null)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeVolume === null && !isResourcesActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSelectVolume(1)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeVolume === 1 && !isResourcesActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vol 1 (1-16)
            </button>
            <button
              onClick={() => onSelectVolume(2)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeVolume === 2 && !isResourcesActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vol 2 (17-28)
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Glossary button (tablet & desktop) */}
          <button
            onClick={onOpenGlossary}
            title="System Design বাংলা শব্দকোষ (Glossary)"
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition"
          >
            <span className="text-indigo-500 font-bold font-bn">শব্দকোষ</span>
          </button>

          {/* Resources */}
          <button
            onClick={onSelectResources}
            title="Papers & Engineering Resources"
            className={`hidden sm:block px-2.5 py-1.5 text-xs font-medium rounded-lg transition border ${
              isResourcesActive
                ? 'bg-indigo-500 text-white border-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
            }`}
          >
            Resources
          </button>

          {/* Font Size Adjuster (desktop) */}
          <div className="hidden lg:flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-900">
            <button
              onClick={() => onChangeFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              title={`Reading Font Size: ${fontSize === 'normal' ? 'Normal' : 'Large'}`}
              className="p-1 rounded text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <Type className={`w-3.5 h-3.5 ${fontSize === 'large' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`} />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/marahim34/system-design-notes"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition flex-shrink-0"
          >
            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>

      </div>
    </header>
  );
}
