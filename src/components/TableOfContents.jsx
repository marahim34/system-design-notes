import React, { useEffect, useState } from 'react';
import { AlignLeft, ArrowUp, Share2, Check, Sparkles } from 'lucide-react';

export default function TableOfContents({ sections, activeLanguage }) {
  const [activeId, setActiveId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0% -70% 0%',
        threshold: 0.1
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pl-6 pr-2 py-4">
      <div className="space-y-4">
        
        {/* TOC Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <AlignLeft className="w-3.5 h-3.5 text-indigo-500" />
            <span>{activeLanguage === 'bn' ? 'এই পৃষ্ঠার বিষয়বস্তু' : 'On This Page'}</span>
          </div>
          
          <button
            onClick={copyPageLink}
            title="Copy page link"
            className="p-1 rounded text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Headings List */}
        <nav className="space-y-1 text-xs">
          {sections.map((sec) => {
            const isActive = activeId === sec.id;
            const displayTitle = activeLanguage === 'bn' ? (sec.titleBn || sec.title) : sec.title;

            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(sec.id);
                }}
                className={`block py-1.5 transition duration-150 leading-snug rounded-md px-2 ${
                  sec.level === 3 ? 'pl-4 text-[11px]' : 'font-medium'
                } ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {displayTitle}
              </a>
            );
          })}
        </nav>

        {/* Back to top button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>

      </div>
    </aside>
  );
}
