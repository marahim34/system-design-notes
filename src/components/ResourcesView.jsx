import React from 'react';
import { ExternalLink, BookOpen, Video, FileText, ArrowRight, Sparkles } from 'lucide-react';
import resourcesData from '../data/resources.json';

export default function ResourcesView({ onSelectChapter }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Curated Engineering Library
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Additional System Design Resources
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-bn">
          আসল ইঞ্জিনিয়ারিং পেপারস, আর্কিটেকচার ব্লগ ও টেক টকস (Google, Amazon, Discord, Netflix, Uber, Slack)
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resourcesData.map((cat, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {cat.title}
              </h3>
            </div>

            <ul className="space-y-2.5">
              {cat.links.map((link, lIdx) => {
                const isVideo = link.url.includes('youtube.com') || link.url.includes('youtu.be');
                const isPdf = link.url.endsWith('.pdf');
                return (
                  <li key={lIdx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-snug">
                        {isVideo ? (
                          <Video className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                        ) : isPdf ? (
                          <FileText className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        ) : (
                          <BookOpen className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        )}
                        <span className="font-medium underline underline-offset-2">{link.title}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 flex-shrink-0 mt-0.5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
