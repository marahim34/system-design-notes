import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, BookOpen, Hash, ArrowRight, X, Sparkles } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  chapters,
  onSelectChapter,
  onSelectSection
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Compute search results
  const results = useMemo(() => {
    if (!query.trim()) {
      // Suggest top popular chapters
      return [
        { type: 'chapter', chapter: chapters[0], title: 'Scale From Zero To Millions Of Users', sub: 'Ch 1 • Scalability fundamentals' },
        { type: 'chapter', chapter: chapters[3], title: 'Design A Rate Limiter', sub: 'Ch 4 • Token Bucket, Leaking Bucket' },
        { type: 'chapter', chapter: chapters[4], title: 'Design Consistent Hashing', sub: 'Ch 5 • Virtual Nodes, Hash Ring' },
        { type: 'chapter', chapter: chapters[11], title: 'Design A Chat System', sub: 'Ch 12 • WebSockets, Message Sync' },
        { type: 'chapter', chapter: chapters[18], title: 'Distributed Message Queue', sub: 'Ch 19 • Kafka, Partitions, Replicas' }
      ].filter(r => Boolean(r.chapter));
    }

    const q = query.toLowerCase();
    const list = [];

    // Search chapters
    for (const ch of chapters) {
      const matchTitle = ch.title.toLowerCase().includes(q);
      const matchBn = ch.titleBn.toLowerCase().includes(q);
      const matchDesc = ch.description?.toLowerCase().includes(q);

      if (matchTitle || matchBn || matchDesc) {
        list.push({
          type: 'chapter',
          chapter: ch,
          title: `Ch ${ch.num}: ${ch.title}`,
          sub: ch.titleBn
        });
      }

      // Search sections within chapter
      if (ch.sections) {
        for (const sec of ch.sections) {
          if (sec.title.toLowerCase().includes(q) || (sec.titleBn && sec.titleBn.toLowerCase().includes(q))) {
            list.push({
              type: 'section',
              chapter: ch,
              section: sec,
              title: sec.title,
              sub: `In Ch ${ch.num}: ${ch.title} • ${sec.titleBn || ''}`
            });
          }
        }
      }
    }

    return list.slice(0, 15);
  }, [chapters, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[selectedIndex];
      if (item) {
        if (item.type === 'chapter') {
          onSelectChapter(item.chapter.slug);
        } else if (item.type === 'section') {
          onSelectSection(item.chapter.slug, item.section.id);
        }
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, concepts, algorithms (e.g. rate limiter, kafka, sharding)..."
            className="w-full py-4 text-sm sm:text-base bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {!query && (
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Popular Chapters
            </div>
          )}

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for generic terms like "cache", "database", or "queue"</p>
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={`${item.type}-${item.chapter?.slug}-${item.section?.id || index}`}
                  onClick={() => {
                    if (item.type === 'chapter') {
                      onSelectChapter(item.chapter.slug);
                    } else {
                      onSelectSection(item.chapter.slug, item.section.id);
                    }
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-500 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {item.type === 'chapter' ? <BookOpen className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs sm:text-sm font-semibold truncate ${
                        isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {item.title}
                      </p>
                      <p className={`text-[11px] truncate font-bn ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-white dark:bg-slate-800 border px-1 py-0.5 rounded">↑</kbd> <kbd className="font-mono bg-white dark:bg-slate-800 border px-1 py-0.5 rounded">↓</kbd> navigate</span>
            <span><kbd className="font-mono bg-white dark:bg-slate-800 border px-1 py-0.5 rounded">↵</kbd> select</span>
            <span><kbd className="font-mono bg-white dark:bg-slate-800 border px-1 py-0.5 rounded">esc</kbd> close</span>
          </div>
          <span className="font-bn hidden sm:inline">বাংলা ও ইংরেজি সার্চ সমর্থিত</span>
        </div>

      </div>
    </div>
  );
}
