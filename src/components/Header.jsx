import React from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Github, 
  Menu, 
  X, 
  BookOpen, 
  Bookmark, 
  HelpCircle, 
  ExternalLink,
  Sliders,
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
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Left: Mobile Menu & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle Navigation"
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">
                  System Design Notes
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50">
                  Vol 1 & 2
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bn hidden sm:block">
                বাংলা ও ইংরেজি সমন্বিত নোটস
              </p>
            </div>
          </a>
        </div>

        {/* Center: Search & Quick Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 transition-colors shadow-sm"
          >
            <Search className="w-4 h-4 text-indigo-500" />
            <span className="hidden md:inline">Search chapters & topics...</span>
            <span className="inline md:hidden">Search...</span>
            <kbd className="hidden lg:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Volume Filter Pills (Desktop) */}
          <div className="hidden lg:flex items-center p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs">
            <button
              onClick={() => onSelectVolume(null)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeVolume === null && !isResourcesActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Chapters
            </button>
            <button
              onClick={() => onSelectVolume(1)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeVolume === 1 && !isResourcesActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vol 1 (1-16)
            </button>
            <button
              onClick={() => onSelectVolume(2)}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                activeVolume === 2 && !isResourcesActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vol 2 (17-28)
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Bengali Glossary Button */}
          <button
            onClick={onOpenGlossary}
            title="System Design বাংলা শব্দকোষ (Glossary)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition"
          >
            <span className="text-indigo-500 font-bold">শব্দকোষ</span>
            <span className="hidden xl:inline text-slate-400 font-mono text-[10px]">Glossary</span>
          </button>

          {/* Resources */}
          <button
            onClick={onSelectResources}
            title="Papers & Engineering Resources"
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition border ${
              isResourcesActive
                ? 'bg-indigo-500 text-white border-indigo-600'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
            }`}
          >
            <span className="hidden sm:inline">Resources</span>
            <span className="sm:hidden">Docs</span>
          </button>

          {/* Font Size Adjuster */}
          <div className="hidden md:flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-900">
            <button
              onClick={() => onChangeFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              title={`Reading Font Size: ${fontSize === 'normal' ? 'Normal' : 'Large'}`}
              className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <Type className={`w-4 h-4 ${fontSize === 'large' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`} />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/marahim34/system-design-notes"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

      </div>
    </header>
  );
}
