import React, { useState } from 'react';
import { X, Search, BookOpen, ExternalLink } from 'lucide-react';

const GLOSSARY_TERMS = [
  {
    en: "Rate Limiter",
    bn: "রেট লিমিটার",
    definition: "একটি উপাদান যা ক্লায়েন্ট বা সার্ভিসের পাঠানো নেটওয়ার্ক রিকোয়েস্টের সংখ্যা নির্দিষ্ট সীমার মধ্যে নিয়ন্ত্রণ করে DoS আক্রমণ এবং সার্ভার ওভারলোড ঠেকায়।",
    chapter: "04-rate-limiter"
  },
  {
    en: "Load Balancer",
    bn: "লোড ব্যালেন্সার",
    definition: "আগত নেটওয়ার্ক ট্রাফিক একাধিক সার্ভারের মাঝে সমবন্টন করে, যাতে কোনো একটি নির্দিষ্ট সার্ভার ওভারলোডেড না হয় এবং হাই অ্যাভেইলেবিলিটি বজায় থাকে।",
    chapter: "01-scaling"
  },
  {
    en: "Consistent Hashing",
    bn: "কনসিস্টেন্ট হ্যাশিং",
    definition: "একটি বিশেষ হ্যাশিং কৌশল যেখানে হ্যাশ টেবিলের আকার পরিবর্তন বা নোড যোগ/বিয়োগের সময় খুব সামান্য সংখ্যক কী (Keys) রিম্যাপ করতে হয়।",
    chapter: "05-consistent-hashing"
  },
  {
    en: "Database Sharding",
    bn: "ডাটাবেস শার্ডিং",
    definition: "একটি বিশাল ডাটাবেসকে অনুভূমিকভাবে (horizontally) ভেঙে একাধিক ছোট ছোট সার্ভারে (shards) ভাগ করার কৌশল।",
    chapter: "01-scaling"
  },
  {
    en: "Database Replication",
    bn: "ডাটাবেস রেপ্লিকেশন",
    definition: "মাস্টার/প্রাইমারি ডাটাবেস থেকে এক বা একাধিক রিড-রেপ্লিকা সার্ভারে ডাটা অনুলিপি তৈরি করা যাতে রিড পারফরম্যান্স এবং ডেটা রিডানড্যান্সি নিশ্চিত হয়।",
    chapter: "01-scaling"
  },
  {
    en: "Message Queue",
    bn: "মেসেজ কিউ",
    definition: "একটি অ্যাসিনক্রোনাস বাফার যা সার্ভিসগুলোর মধ্যকার ডিপেন্ডেন্সি ডিকাপল করে এবং বার্তাগুলো হারিয়ে না গিয়ে ক্রমানুসারে প্রসেস হতে সহায়তা করে।",
    chapter: "19-distributed-message-queue"
  },
  {
    en: "Idempotency",
    bn: "আইডেমপোটেন্সি",
    definition: "একটি সিস্টেম অপারেশন যা একবার বা একাধিকবার চালালেও ফলাফলে কোনো ভিন্নতা বা অনিচ্ছাকৃত ডুপ্লিকেট পরিবর্তন সৃষ্টি করে না (বিশেষ করে পেমেন্ট সিস্টেমে আবশ্যক)।",
    chapter: "26-payment-system"
  },
  {
    en: "CAP Theorem",
    bn: "সিএপি উপপাদ্য",
    definition: "ডিস্ট্রিবিউটেড সিস্টেমে কনসিস্টেন্সি (Consistency), অ্যাভেইলেবিলিটি (Availability) এবং পার্টিশন টলারেন্স (Partition Tolerance)-এর মধ্যে সর্বোচ্চ দুটি সুবিধা একসাথে অর্জন সম্ভব।",
    chapter: "06-key-value-store"
  },
  {
    en: "Cache Invalidation",
    bn: "ক্যাশ ইনভ্যালিডেশন",
    definition: "যখন আসল ডাটা পরিবর্তিত হয় তখন ক্যাশের পুরনো বা স্টেল (stale) ডাটা সরিয়ে নতুন ডাটা দিয়ে ক্যাশ আপডেট করার প্রক্রিয়া।",
    chapter: "01-scaling"
  },
  {
    en: "Single Point of Failure (SPOF)",
    bn: "একক ব্যর্থতার বিন্দু",
    definition: "সিস্টেমের এমন কোনো গুরুত্বপূর্ণ উপাদান যা বিকল হলে সম্পূর্ণ সিস্টেম ডাউন হয়ে যায়।",
    chapter: "01-scaling"
  },
  {
    en: "Geohash & Quadtree",
    bn: "জিয়োহ্যাশ এবং কোয়াডট্রি",
    definition: "ভৌগোলিক স্থানাঙ্ক (অক্ষাংশ ও দ্রাঘিমাংশ) দ্বিমাত্রিক স্পেস থেকে হায়ারার্কিকাল স্ট্রিং বা গাঠনিক গাছে রূপান্তর করার অ্যালগরিদম যা কাছের স্থান খুঁজতে ব্যবহৃত হয়।",
    chapter: "16-proximity-service"
  },
  {
    en: "Raft / Paxos Consensus",
    bn: "কনসেনসাস প্রোটোকল",
    definition: "ডিস্ট্রিবিউটেড নোডগুলোর মধ্যে কোনো একটি বিষয়ে সবার সম্মতিতে পৌঁছানোর অ্যালগরিদম, যা লিডার নির্বাচন ও ডাটা রেপ্লিকেশনে ব্যবহৃত হয়।",
    chapter: "27-digital-wallet"
  }
];

export default function BanglaGlossaryModal({ isOpen, onClose, onSelectChapter }) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_TERMS.filter(item => 
    item.en.toLowerCase().includes(search.toLowerCase()) ||
    item.bn.toLowerCase().includes(search.toLowerCase()) ||
    item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                System Design বাংলা শব্দকোষ (Glossary)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bn">
                সিস্টেম ডিজাইনের বহুল ব্যবহৃত পরিভাষা ও বাংলা ব্যাখ্যা
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search glossary terms (e.g. rate limiter, sharding, idempotency)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
        </div>

        {/* Terms Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:border-indigo-300 dark:hover:border-indigo-800 transition"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm sm:text-base">
                    {item.en}
                  </span>
                  <span className="font-bn font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                    ({item.bn})
                  </span>
                </div>
                {item.chapter && (
                  <button
                    onClick={() => {
                      onSelectChapter(item.chapter);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0"
                  >
                    <span>View Chapter</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-bn leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
