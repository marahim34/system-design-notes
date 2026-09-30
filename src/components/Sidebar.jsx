import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  Bookmark, 
  Layers, 
  Search,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({
  chapters,
  currentSlug,
  onSelectChapter,
  completedSlugs,
  onToggleCompleted,
  isOpen,
  onCloseMobile,
  isResourcesActive,
  onSelectResources,
  onOpenGlossary
}) {
  const [filterText, setFilterText] = useState('');
  const [vol1Open, setVol1Open] = useState(true);
  const [vol2Open, setVol2Open] = useState(true);
  const [showBanglaSubtitles, setShowBanglaSubtitles] = useState(true);

  // Filter chapters by text
  const filteredChapters = useMemo(() => {
    if (!filterText.trim()) return chapters;
    const q = filterText.toLowerCase();
    return chapters.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.titleBn.toLowerCase().includes(q) ||
      c.num.toString().includes(q)
    );
  }, [chapters, filterText]);

  const vol1Chapters = useMemo(() => filteredChapters.filter(c => c.volume === 1), [filteredChapters]);
  const vol2Chapters = useMemo(() => filteredChapters.filter(c => c.volume === 2), [filteredChapters]);

  const completedCount = completedSlugs.length;
  const progressPercent = Math.round((completedCount / (chapters.length || 1)) * 100);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      <aside className={`
        fixed md:sticky top-16 z-40 md:z-20
        h-[calc(100vh-4rem)] w-72 lg:w-80 flex-shrink-0
        bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800/80
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header: Search & Progress */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/80 space-y-3">
          
          {/* Quick filter inside sidebar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter chapters..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            {filterText && (
              <button 
                onClick={() => setFilterText('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Progress Tracker */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Prep Progress
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                {completedCount}/{chapters.length} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Bengali Subtitles Toggle */}
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Show বাংলা subtitles</span>
            <button
              onClick={() => setShowBanglaSubtitles(prev => !prev)}
              className={`w-7 h-4 flex items-center rounded-full p-0.5 transition duration-200 ${
                showBanglaSubtitles ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div 
                className={`bg-white w-3 h-3 rounded-full shadow-md transform transition duration-200 ${
                  showBanglaSubtitles ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Chapters List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-sm">
          
          {/* Volume 1 Section */}
          <div>
            <button
              onClick={() => setVol1Open(prev => !prev)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                Volume 1 (Ch 1 - 16)
              </span>
              {vol1Open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {vol1Open && (
              <div className="mt-1 space-y-0.5">
                {vol1Chapters.map(chapter => (
                  <ChapterNavItem
                    key={chapter.slug}
                    chapter={chapter}
                    isActive={!isResourcesActive && currentSlug === chapter.slug}
                    isCompleted={completedSlugs.includes(chapter.slug)}
                    showBangla={showBanglaSubtitles}
                    onSelect={() => {
                      onSelectChapter(chapter.slug);
                      onCloseMobile();
                    }}
                    onToggleComplete={(e) => {
                      e.stopPropagation();
                      onToggleCompleted(chapter.slug);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Volume 2 Section */}
          <div>
            <button
              onClick={() => setVol2Open(prev => !prev)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-purple-500" />
                Volume 2 (Ch 17 - 28)
              </span>
              {vol2Open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {vol2Open && (
              <div className="mt-1 space-y-0.5">
                {vol2Chapters.map(chapter => (
                  <ChapterNavItem
                    key={chapter.slug}
                    chapter={chapter}
                    isActive={!isResourcesActive && currentSlug === chapter.slug}
                    isCompleted={completedSlugs.includes(chapter.slug)}
                    showBangla={showBanglaSubtitles}
                    onSelect={() => {
                      onSelectChapter(chapter.slug);
                      onCloseMobile();
                    }}
                    onToggleComplete={(e) => {
                      e.stopPropagation();
                      onToggleCompleted(chapter.slug);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Extra Resources Item */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onSelectResources();
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                isResourcesActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800/60'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-medium">Additional Resources</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Papers, Blogs & Talks</div>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenGlossary();
                onCloseMobile();
              }}
              className="mt-1 w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <BookOpen className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-medium">বাংলা শব্দকোষ (Glossary)</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Key Terms Cheat Sheet</div>
              </div>
            </button>
          </div>

        </div>

      </aside>
    </>
  );
}

function ChapterNavItem({ 
  chapter, 
  isActive, 
  isCompleted, 
  showBangla, 
  onSelect, 
  onToggleComplete 
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-start gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer transition ${
        isActive 
          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-100 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs' 
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
      }`}
    >
      {/* Chapter Number Badge */}
      <span className={`w-5 h-5 flex-shrink-0 rounded-md text-[11px] font-mono flex items-center justify-center font-bold mt-0.5 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-xs'
          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/80 group-hover:text-indigo-600'
      }`}>
        {chapter.num}
      </span>

      {/* Title & Subtitle */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium leading-tight truncate ${
          isActive ? 'font-semibold text-indigo-950 dark:text-white' : ''
        }`}>
          {chapter.title}
        </p>
        {showBangla && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bn leading-tight truncate mt-0.5">
            {chapter.titleBn}
          </p>
        )}
      </div>

      {/* Completion toggle checkmark */}
      <button
        onClick={onToggleComplete}
        title={isCompleted ? 'Mark as unread' : 'Mark as completed'}
        className="opacity-60 hover:opacity-100 mt-0.5 text-slate-400 hover:text-emerald-500 transition"
      >
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <Circle className="w-4 h-4 hover:stroke-emerald-500" />
        )}
      </button>
    </div>
  );
}
