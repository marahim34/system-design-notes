import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

export default function ImageLightbox({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setScale(s => Math.min(s + 0.25, 3));
      if (e.key === '-') setScale(s => Math.max(s - 0.25, 0.5));
      if (e.key === '0') setScale(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!src) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Lightbox Controls Bar */}
      <div 
        className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 border border-slate-700 rounded-full px-3 py-1.5 shadow-xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setScale(s => Math.min(s + 0.25, 3))}
          title="Zoom In (+)"
          className="p-1.5 hover:bg-slate-800 rounded-full transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono px-1">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => setScale(s => Math.max(s - 0.25, 0.5))}
          title="Zoom Out (-)"
          className="p-1.5 hover:bg-slate-800 rounded-full transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setScale(1)}
          title="Reset Zoom (0)"
          className="p-1.5 hover:bg-slate-800 rounded-full transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <a
          href={src}
          download
          target="_blank"
          rel="noopener noreferrer"
          title="Open / Download Image"
          className="p-1.5 hover:bg-slate-800 rounded-full transition"
        >
          <Download className="w-4 h-4" />
        </a>
        <div className="w-px h-4 bg-slate-700 mx-1" />
        <button
          onClick={onClose}
          title="Close (Esc)"
          className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-full transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image Display */}
      <div 
        className="max-w-5xl max-h-[85vh] overflow-auto flex items-center justify-center p-2 cursor-grab"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt || 'System Architecture Diagram'}
          style={{ transform: `scale(${scale})`, transition: 'transform 0.15s ease-out' }}
          className="rounded-lg shadow-2xl object-contain max-h-[80vh] bg-white p-2"
        />
      </div>

      {alt && (
        <p className="mt-3 text-xs text-slate-300 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
          {alt}
        </p>
      )}
    </div>
  );
}
