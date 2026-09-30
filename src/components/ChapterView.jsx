import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  Clock, 
  Image as ImageIcon, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Share2, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Sparkles,
  Columns,
  List,
  ChevronDown,
  ChevronUp,
  Copy
} from 'lucide-react';
import ImageLightbox from './ImageLightbox';

export default function ChapterView({
  chapter,
  isCompleted,
  onToggleCompleted,
  isBookmarked,
  onToggleBookmark,
  onSelectChapter,
  fontSize = 'normal',
  activeTab,
  onChangeTab
}) {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [lightboxAlt, setLightboxAlt] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileTocOpen(false);
  }, [chapter?.slug]);

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 text-slate-400">
        <p className="text-sm">Select a chapter from the sidebar to start reading.</p>
      </div>
    );
  }

  const copyChapterLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Custom code renderer with copy button
  const CodeBlock = ({ inline, className, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    const codeString = String(children).replace(/\n$/, '');

    if (inline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    const copyCode = () => {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative group my-3 sm:my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-sm max-w-full">
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-slate-950/80 border-b border-slate-800 text-[11px] sm:text-xs text-slate-400 font-mono">
          <span>Code / Algorithm</span>
          <button
            onClick={copyCode}
            className="flex items-center gap-1 hover:text-white transition px-2 py-0.5 rounded hover:bg-slate-800"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-3 sm:p-4 text-xs sm:text-sm text-slate-100 font-mono overflow-x-auto leading-relaxed">
          <code>{children}</code>
        </pre>
      </div>
    );
  };

  // Custom image renderer with lightbox click
  const ImageRenderer = ({ src, alt, ...props }) => {
    return (
      <span className="block my-4 sm:my-6 text-center max-w-full">
        <img
          src={src}
          alt={alt || 'System Architecture Diagram'}
          onClick={() => {
            setLightboxSrc(src);
            setLightboxAlt(alt || '');
          }}
          title="Click to zoom diagram"
          className="inline-block rounded-xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-200 cursor-zoom-in max-h-[480px] max-w-full object-contain bg-white dark:bg-slate-900 p-1"
          {...props}
        />
        {alt && (
          <span className="block text-center text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-mono italic">
            Diagram: {alt}
          </span>
        )}
      </span>
    );
  };

  // Custom table renderer to ensure horizontal scroll on mobile
  const TableRenderer = ({ children, ...props }) => {
    return (
      <div className="markdown-table-wrapper">
        <table {...props}>{children}</table>
      </div>
    );
  };

  // Custom heading renderers
  const createHeading = (level) => {
    return ({ children }) => {
      const text = String(children);
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const Tag = `h${level}`;
      return (
        <Tag id={id} className="group relative cursor-pointer">
          {children}
          <a
            href={`#${id}`}
            aria-label={`Link to ${text}`}
            className="opacity-0 group-hover:opacity-100 text-indigo-500 ml-1.5 transition-opacity inline-block text-xs sm:text-sm"
          >
            #
          </a>
        </Tag>
      );
    };
  };

  const markdownComponents = {
    code: CodeBlock,
    img: ImageRenderer,
    table: TableRenderer,
    h2: createHeading(2),
    h3: createHeading(3)
  };

  const textSizeClass = fontSize === 'large' ? 'text-sm sm:text-base md:text-lg' : 'text-xs sm:text-sm md:text-base';

  return (
    <div className="flex-1 min-w-0 py-4 sm:py-8 px-3 sm:px-6 md:px-8 max-w-4xl xl:max-w-5xl mx-auto w-full">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
          <span>System Design</span>
          <span>/</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate">
            {chapter.volume === 1 ? 'Vol 1' : 'Vol 2'}
          </span>
          <span>/</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">Ch {chapter.num}</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onToggleBookmark(chapter.slug)}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this chapter'}
            className={`p-1.5 sm:p-2 rounded-lg border transition ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={copyChapterLink}
            title="Share Chapter Link"
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          <button
            onClick={() => onToggleCompleted(chapter.slug)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                <span>Done</span>
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Mark read</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Chapter Title Banner */}
      <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-block px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 mb-1.5">
          CHAPTER {chapter.num}
        </div>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {chapter.title}
        </h1>
        <p className="mt-1.5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 font-bn">
          {chapter.titleBn}
        </p>

        {/* Metadata stats bar */}
        <div className="flex items-center gap-3 sm:gap-4 mt-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex-wrap">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500" />
            {chapter.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500" />
            {chapter.imageCount} diagrams
          </span>
          {chapter.description && (
            <span className="hidden md:inline-block text-slate-400 font-bn truncate">
              • {chapter.description}
            </span>
          )}
        </div>

        {/* Mobile On-This-Page Table of Contents Dropdown */}
        {chapter.sections && chapter.sections.length > 0 && (
          <div className="mt-4 xl:hidden bg-slate-100/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            <button
              onClick={() => setMobileTocOpen(prev => !prev)}
              className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <span className="flex items-center gap-2">
                <List className="w-4 h-4 text-indigo-500" />
                <span>On this page ({chapter.sections.length} sections)</span>
              </span>
              {mobileTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {mobileTocOpen && (
              <div className="p-3 pt-0 border-t border-slate-200/60 dark:border-slate-800/60 max-h-60 overflow-y-auto space-y-1">
                {chapter.sections.map(sec => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    className={`block py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                      sec.level === 3 ? 'pl-3 text-[11px]' : 'font-medium'
                    }`}
                  >
                    {activeTab === 'bn' ? (sec.titleBn || sec.title) : sec.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 🇧🇩 / 🇬🇧 THE LANGUAGE TABS (English / বাংলা / Side-by-Side) */}
      {/* ========================================================================= */}
      <div className="sticky top-14 sm:top-16 z-20 py-2 sm:py-2.5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 mb-4 sm:mb-6 -mx-3 sm:mx-0 px-3 sm:px-0">
        <div className="flex items-center justify-between gap-2">
          
          {/* Main Tab Switcher */}
          <div className="flex-1 md:flex-initial flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium">
            <button
              onClick={() => onChangeTab('en')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'en'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>

            <button
              onClick={() => onChangeTab('bn')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'bn'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🇧🇩</span>
              <span className="font-bn font-bold">বাংলা</span>
            </button>

            <button
              onClick={() => onChangeTab('split')}
              title="Side-by-side English and Bangla view"
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'split'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5 text-purple-500" />
              <span className="font-bn">পাশাপাশি (Split)</span>
            </button>
          </div>

          {/* Active Tab Notice Banner (desktop) */}
          <div className="hidden sm:flex text-xs text-slate-500 dark:text-slate-400 items-center gap-1.5 font-bn">
            {activeTab === 'bn' && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                বাংলা সংস্করণ
              </span>
            )}
            {activeTab === 'en' && (
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                English Original
              </span>
            )}
            {activeTab === 'split' && (
              <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60">
                পাশাপাশি মোড
              </span>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTENT RENDERING */}
      {/* ========================================================================= */}

      {/* 1. English Tab */}
      {activeTab === 'en' && (
        <article className={`markdown-body ${textSizeClass}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {chapter.contentEn}
          </ReactMarkdown>
        </article>
      )}

      {/* 2. Bangla Tab */}
      {activeTab === 'bn' && (
        <article className={`markdown-body font-bn ${textSizeClass}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {chapter.contentBn}
          </ReactMarkdown>
        </article>
      )}

      {/* 3. Split View (Desktop) / Stacked View (Mobile) */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 border-t border-slate-200 dark:border-slate-800 pt-4 sm:pt-6">
          {/* Left Column: English */}
          <div className="p-3 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="sticky top-28 z-10 flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">English Original</span>
              <span className="text-xs font-mono text-indigo-500 font-semibold">EN</span>
            </div>
            <article className={`markdown-body ${textSizeClass}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {chapter.contentEn}
              </ReactMarkdown>
            </article>
          </div>

          {/* Right Column: Bangla */}
          <div className="p-3 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="sticky top-28 z-10 flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500 font-bn">বাংলা অনুবাদ</span>
              <span className="text-xs font-mono text-emerald-500 font-semibold">BN</span>
            </div>
            <article className={`markdown-body font-bn ${textSizeClass}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {chapter.contentBn}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM NAVIGATION: PREV & NEXT CHAPTER */}
      {/* ========================================================================= */}
      <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          
          {/* Previous Chapter */}
          {chapter.prev ? (
            <div
              onClick={() => onSelectChapter(chapter.prev.slug)}
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-indigo-400 dark:hover:border-indigo-600 transition cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 group-hover:text-indigo-600">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Prev Chapter ({chapter.prev.num})</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">
                {chapter.prev.title}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bn line-clamp-1 mt-0.5">
                {chapter.prev.titleBn}
              </p>
            </div>
          ) : <div className="hidden sm:block" />}

          {/* Next Chapter */}
          {chapter.next ? (
            <div
              onClick={() => onSelectChapter(chapter.next.slug)}
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-indigo-400 dark:hover:border-indigo-600 transition cursor-pointer group sm:text-right"
            >
              <div className="flex items-center sm:justify-end gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 group-hover:text-indigo-600">
                <span>Next Chapter ({chapter.next.num})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">
                {chapter.next.title}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bn line-clamp-1 mt-0.5">
                {chapter.next.titleBn}
              </p>
            </div>
          ) : <div className="hidden sm:block" />}

        </div>

        {/* GitHub Edit Link */}
        <div className="mt-6 sm:mt-8 text-center text-xs text-slate-400">
          <a
            href={`https://github.com/marahim34/system-design-notes`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition underline underline-offset-4"
          >
            <span>GitHub repository</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}

    </div>
  );
}
