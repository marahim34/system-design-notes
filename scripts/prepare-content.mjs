import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicDir = path.join(rootDir, 'public');
const chaptersPublicDir = path.join(publicDir, 'chapters');
const dataDir = path.join(rootDir, 'src', 'data');
const chaptersDataDir = path.join(dataDir, 'chapters');

// Ensure directories exist
for (const dir of [publicDir, chaptersPublicDir, dataDir, chaptersDataDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Bengali chapter title mapping & descriptions
const chapterInfoMap = {
  1: {
    bnTitle: "শূন্য থেকে লক্ষ-কোটি ব্যবহারকারীতে স্কেলিং",
    enTitle: "Scale From Zero To Millions Of Users",
    description: "সিঙ্গেল সার্ভার থেকে শুরু করে মাল্টিপল ডাটা সেন্টার, ক্যাশিং, ডাটাবেস রেপ্লিকেশন ও শার্ডিং এর মাধ্যমে মিলিয়ন ব্যবহারকারীর সিস্টেম আর্কিটেকচার।"
  },
  2: {
    bnTitle: "ব্যাক-অফ-দ্য-এনভেলপ হিসাব ও অনুমান",
    enTitle: "Back-of-the-Envelope Estimation",
    description: "সিস্টেম ডিজাইনে পারফরম্যান্স, মেমোরি, লেটেন্সি এবং থ্রুপুট পরিমাপের দ্রুত গণনামূলক হিসাব।"
  },
  3: {
    bnTitle: "সিস্টেম ডিজাইন ইন্টারভিউ ফ্রেমওয়ার্ক",
    enTitle: "A Framework For System Design Interviews",
    description: "৪ ধাপের কার্যকর সিস্টেম ডিজাইন ইন্টারভিউ ফ্রেমওয়ার্ক: প্রয়োজনীয়তা বিশ্লেষণ, হাই-লেভেল ডিজাইন, ডিপ ডাইভ এবং র‍্যাপ-আপ।"
  },
  4: {
    bnTitle: "রেট লিমিটার ডিজাইন",
    enTitle: "Design A Rate Limiter",
    description: "DoS আক্রমণ প্রতিরোধ ও সার্ভার লোড নিয়ন্ত্রণে টোকেন বাকেট, লিংকিং বাকেট এবং স্লাইডিং উইন্ডো রেট লিমিটিং অ্যালগরিদম।"
  },
  5: {
    bnTitle: "কনসিস্টেন্ট হ্যাশিং ডিজাইন",
    enTitle: "Design Consistent Hashing",
    description: "ডিস্ট্রিবিউটেড ক্যাশ ও ডাটাবেসে ভার্চুয়াল নোড এবং হ্যাশ রিং ব্যবহার করে ডাটা রিব্যালান্সিং অপ্টিমাইজেশন।"
  },
  6: {
    bnTitle: "কী-ভ্যালু স্টোর ডিজাইন",
    enTitle: "Design A Key-Value Store",
    description: "CAP থিওরেম, ভেক্টর ক্লক, কোরাম কনসেনসাস ও SSTable/LSM-Tree ভিত্তিক ডিস্ট্রিবিউটেড কী-ভ্যালু স্টোরেজ।"
  },
  7: {
    bnTitle: "ডিস্ট্রিবিউটেড ইউনিক আইডি জেনারেটর",
    enTitle: "Design A Unique ID Generator In Distributed Systems",
    description: "টুইটার স্নোফ্লেক (Snowflake) আর্কিটেকচার ও ৬০-বিট ডিস্ট্রিবিউটেড সর্টেবল আইডি জেনারেশন।"
  },
  8: {
    bnTitle: "ইউআরএল শর্টনার ডিজাইন (TinyURL)",
    enTitle: "Design A URL Shortener",
    description: "Base62 এনকোডিং, হ্যাশ কলিশন হ্যান্ডলিং এবং উচ্চ-স্কেলের রিড-হেভি URL রিডাইরেকশন সিস্টেম।"
  },
  9: {
    bnTitle: "ওয়েব ক্রলার ডিজাইন",
    enTitle: "Design A Web Crawler",
    description: "সার্চ ইঞ্জিনের জন্য রোবট.txt, URL ফ্রন্টিয়ার, ডুপ্লিকেট কনটেন্ট ডিটেকশন ও মাল্টি-থ্রেডেড ক্রলিং।"
  },
  10: {
    bnTitle: "নোটিফিকেশন সিস্টেম ডিজাইন",
    enTitle: "Design A Notification System",
    description: "মোবাইল পুশ নোটিফিকেশন (APNs/FCM), SMS এবং ইমেইল ডেলিভারি আর্কিটেকচার উইথ মেসেজ কিউ।"
  },
  11: {
    bnTitle: "নিউজ ফিড সিস্টেম ডিজাইন",
    enTitle: "Design A News Feed System",
    description: "ফেসবুক বা টুইটার স্টাইলের ফ্যান-আউট অন রাইট বনাম ফ্যান-আউট অন রিড এবং ফিড ক্যাশিং কৌশল।"
  },
  12: {
    bnTitle: "রিয়েল-টাইম চ্যাট সিস্টেম ডিজাইন",
    enTitle: "Design A Chat System",
    description: "ওয়েবসকেট (WebSocket), ডিসকর্ড/স্ল্যাক স্টাইল মেসেজ সিঙ্ক, অনলাইন প্রেজেন্স এবং মেসেজ স্টোরেজ।"
  },
  13: {
    bnTitle: "সার্চ অটো-কমপ্লিট সিস্টেম ডিজাইন",
    enTitle: "Design A Search Autocomplete System",
    description: "ট্রাই (Trie) ডেটা স্ট্রাকচার, প্রিফিক্স ক্যাশিং এবং টপ-K সার্চ কুয়েরি অপ্টিমাইজেশন।"
  },
  14: {
    bnTitle: "ইউটিউব ভিডিও প্ল্যাটফর্ম ডিজাইন",
    enTitle: "Design YouTube",
    description: "ভিডিও আপলোড, ট্রান্সকোডিং ও এনকোডিং পাইপলাইন, CDN ডিস্ট্রিবিউশন এবং স্ট্রিমিং আর্কিটেকচার।"
  },
  15: {
    bnTitle: "গুগল ড্রাইভ ক্লাউড স্টোরেজ ডিজাইন",
    enTitle: "Design Google Drive",
    description: "ব্লক লেভেল ডিফারেনশিয়াল সিঙ্ক, ফাইল ভার্সনিং, মেটাডাটা ডাটাবেস ও অবজেক্ট স্টোরেজ।"
  },
  16: {
    bnTitle: "প্রক্সিমিটি সার্ভিস (কাছের স্থান খোঁজা)",
    enTitle: "Proximity Service",
    description: "জিয়োহ্যাশ (Geohash), কোয়াডট্রি (Quadtree) এবং লোকাল বিজনেস সার্চ আর্কিটেকচার।"
  },
  17: {
    bnTitle: "নিয়ারবাই ফ্রেন্ডস সিস্টেম",
    enTitle: "Nearby Friends",
    description: "রেডিস পাব/সাব (Redis Pub/Sub), পিরিয়ডিক লোকেশন আপডেট ও রিয়েল-টাইম ফ্রেন্ড ট্র্যাকিং।"
  },
  18: {
    bnTitle: "গুগল ম্যাপস ডিজাইন",
    enTitle: "Design Google Maps",
    description: "ম্যাপ টাইল রাস্টারিং, জিওস্পেশিয়াল রাউটিং অ্যালগরিদম ও ট্রাফিক প্রেডিকশন আর্কিটেকচার।"
  },
  19: {
    bnTitle: "ডিস্ট্রিবিউটেড মেসেজ কিউ (Kafka/Pulsar)",
    enTitle: "Distributed Message Queue",
    description: "পার্টিশনড লগ, কনজিউমার গ্রুপ, রেপ্লিকেশন ও হাই-থ্রুপুট মেসেজ ব্রোকার ডিজাইন।"
  },
  20: {
    bnTitle: "মেট্রিক্স মনিটরিং এবং অ্যালার্টিং সিস্টেম",
    enTitle: "Metrics Monitoring and Alerting System",
    description: "টাইম-সিরিজ ডাটাবেস (TSDB), মেট্রিক্স কালেকশন এজেন্ট, ড্যাশবোর্ড ও নোটিফিকেশন রুল ইঞ্জিন।"
  },
  21: {
    bnTitle: "অ্যাড ক্লিক ইভেন্ট এগ্রিগেশন",
    enTitle: "Ad Click Event Aggregation",
    description: "স্ট্রিম প্রসেসিং (Flink/Kafka), ওয়াটারমার্কিং, এক্সেক্টলি-ওয়ান্স সেমান্টিকস ও ক্লিক ডিডুপ্লিকেট।"
  },
  22: {
    bnTitle: "হোটেল বুকিং এবং রিজার্ভেশন সিস্টেম",
    enTitle: "Hotel Reservation System",
    description: "ওভারবুকিং প্রতিরোধ, ডিস্ট্রিবিউটেড ট্রানজ্যাকশন, পেসিমিস্টিক ও অপটিমিস্টিক লকিং।"
  },
  23: {
    bnTitle: "ডিস্ট্রিবিউটেড ইমেইল সার্ভিস",
    enTitle: "Distributed Email Service",
    description: "SMTP, IMAP, POP3 প্রোটোকল, ইমেইল স্টোরেজ স্কেলিং ও স্প্যাম ফিল্টারিং আর্কিটেকচার।"
  },
  24: {
    bnTitle: "এস-৩ অবজেক্ট স্টোরেজ ডিজাইন",
    enTitle: "S3-like Object Storage",
    description: "ডাটা ও মেটাডাটা নোড সেপারেশন, ইরেজার কোডিং (Erasure Coding) ও হাই ডিউরাবিলিটি স্টোরেজ।"
  },
  25: {
    bnTitle: "রিয়েল-টাইম গেমিং লিডারবোর্ড",
    enTitle: "Real-time Gaming Leaderboard",
    description: "রেডিস সর্টেড সেট (Sorted Set / ZSET) ব্যবহার করে মিলিয়ন প্লেয়ারের রিয়েল-টাইম র‍্যাঙ্কিং।"
  },
  26: {
    bnTitle: "পেমেন্ট সিস্টেম আর্কিটেকচার",
    enTitle: "Payment System",
    description: "আইডেমপোটেন্সি (Idempotency), ডাবল-এন্ট্রি লেজার, রিকনসিলিয়েশন ও পেমেন্ট গেটওয়ে ইন্টিগ্রেশন।"
  },
  27: {
    bnTitle: "ডিজিটাল ওয়ালেট সিস্টেম",
    enTitle: "Digital Wallet",
    description: "ব্যালেন্স ট্রানজ্যাকশন, Raft কনসেনসাস অ্যালগরিদম, রকিং এবং হাই-থ্রুপুট ওয়ালেট লেজার।"
  },
  28: {
    bnTitle: "স্টক এক্সচেঞ্জ ট্রেডিং সিস্টেম",
    enTitle: "Stock Exchange",
    description: "ম্যাচিং ইঞ্জিন, অর্ডার বুক (L1/L2/L3), মাইক্রোসেকেন্ড লো-লেটেন্সি আর্কিটেকচার ও সিকুয়েন্সার।"
  }
};

// Translate markdown content to rich Bengali if translation file does not exist
function generateBanglaTranslation(enMarkdown, chNum, enTitle) {
  const info = chapterInfoMap[chNum] || {};
  const bnTitle = info.bnTitle || enTitle;

  // Split lines and translate section by section
  const lines = enMarkdown.split('\n');
  const translatedLines = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Preserve code blocks exactly
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      translatedLines.push(line);
      continue;
    }
    if (inCodeBlock) {
      translatedLines.push(line);
      continue;
    }

    // Preserve images and raw html
    if (line.includes('<img ') || line.includes('<div') || line.includes('</div>')) {
      translatedLines.push(line);
      continue;
    }

    // Preserve horizontal rules
    if (line.trim() === '---' || line.trim() === '***') {
      translatedLines.push(line);
      continue;
    }

    // Translate headings
    if (line.startsWith('# ')) {
      translatedLines.push(`# অধ্যায় ${chNum}: ${bnTitle}`);
      continue;
    }

    if (line.startsWith('## ')) {
      const heading = line.replace('## ', '').trim();
      const bnHeading = translateHeading(heading);
      translatedLines.push(`## ${bnHeading}`);
      continue;
    }

    if (line.startsWith('### ')) {
      const heading = line.replace('### ', '').trim();
      const bnHeading = translateHeading(heading);
      translatedLines.push(`### ${bnHeading}`);
      continue;
    }

    if (line.startsWith('#### ')) {
      const heading = line.replace('#### ', '').trim();
      const bnHeading = translateHeading(heading);
      translatedLines.push(`#### ${bnHeading}`);
      continue;
    }

    // Translate common paragraph / list lines
    translatedLines.push(translateParagraph(line));
  }

  return translatedLines.join('\n');
}

function translateHeading(text) {
  const headingDict = {
    'Introduction': 'ভূমিকা (Introduction)',
    'Section 1: Single Server Setup': 'সেকশন ১: সিঙ্গেল সার্ভার সেটআপ (Single Server Setup)',
    'Section 2: Database Separation': 'সেকশন ২: ডাটাবেস পৃথকীকরণ (Database Separation)',
    'Section 3: Vertical vs Horizontal Scaling': 'সেকশন ৩: ভার্টিক্যাল বনাম হরাইজন্টাল স্কেলিং',
    'Section 4: Load Balancer': 'সেকশন ৪: লোড ব্যালেন্সার (Load Balancer)',
    'Section 5: Database Replication': 'সেকশন ৫: ডাটাবেস রেপ্লিকেশন (Database Replication)',
    'Section 6: Cache': 'সেকশন ৬: ক্যাশ টিয়ার (Cache Tier)',
    'Section 7: Content Delivery Network (CDN)': 'সেকশন ৭: কনটেন্ট ডেলিভারি নেটওয়ার্ক (CDN)',
    'Section 8: Stateless Web Tier': 'সেকশন ৮: স্টেটলেস ওয়েব টিয়ার (Stateless Web Tier)',
    'Section 9: Data Centers': 'সেকশন ৯: মাল্টিপল ডেটা সেন্টার (Data Centers)',
    'Section 10: Message Queue': 'সেকশন ১০: মেসেজ কিউ (Message Queue)',
    'Section 11: Logging, Metrics, Automation': 'সেকশন ১১: লগিং, মেট্রিক্স এবং অটোমেশন',
    'Section 12: Database Scaling': 'সেকশন ১২: ডাটাবেস স্কেলিং ও শার্ডিং (Database Scaling)',
    'Section 13: Millions of Users and Beyond': 'সেকশন ১৩: কোটি ব্যবহারকারী এবং তার পরবর্তী ধাপ',
    'Request Flow': 'রিকোয়েস্ট ফ্লো (Request Flow)',
    'Traffic Sources': 'ট্রাফিক সোর্সসমূহ (Traffic Sources)',
    'Database Choices': 'ডাটাবেস নির্বাচন (Database Choices)',
    'Vertical Scaling': 'ভার্টিক্যাল স্কেলিং (Vertical Scaling)',
    'Horizontal Scaling': 'হরাইজন্টাল স্কেলিং (Horizontal Scaling)',
    'Advantages': 'সুবিধাসমূহ (Advantages)',
    'Considerations for Using Cache': 'ক্যাশ ব্যবহারের গুরুত্বপূর্ণ বিবেচ্য বিষয়সমূহ',
    'Considerations for Using CDN': 'CDN ব্যবহারের বিবেচ্য বিষয়সমূহ',
    'Stateful Architecture': 'স্টেটফুল আর্কিটেকচার (Stateful Architecture)',
    'Stateless Architecture': 'স্টেটলেস আর্কিটেকচার (Stateless Architecture)',
    'Data Center Routing': 'ডাটা সেন্টার রাউটিং (GeoDNS)',
    'Challenges in Multi-Data Center': 'মাল্টি-ডাটা সেন্টারের প্রধান চ্যালেঞ্জসমূহ',
    'Benefits': 'সুবিধাসমূহ (Benefits)',
    'Vertical Scaling (Scale-Up)': 'ভার্টিক্যাল স্কেলিং (স্কেল-আপ)',
    'Horizontal Scaling (Sharding)': 'হরাইজন্টাল স্কেলিং (শার্ডিং)',
    'Sharding Challenges': 'শার্ডিংয়ের প্রধান চ্যালেঞ্জসমূহ',
    'Summary of Scaling Techniques': 'স্কেলিং টেকনিকের সামগ্রিক সারসংক্ষেপ',
    'Step 1: Understand the Problem and Establish Design Scope': 'ধাপ ১: সমস্যা বোঝা এবং ডিজাইনের পরিধি নির্ধারণ',
    'Step 2: Propose High-Level Design and Get Buy-In': 'ধাপ ২: হাই-লেভেল ডিজাইন প্রস্তাব ও অনুমোদন গ্রহণ',
    'Step 3: Design Deep Dive': 'ধাপ ৩: বিস্তারিত আর্কিটেকচার ডিপ-ডাইভ (Design Deep Dive)',
    'Step 4: Wrap Up': 'ধাপ ৪: সমাপ্তি ও ভবিষ্যৎ উন্নয়ন (Wrap Up)',
    'Benefits of Rate Limiting': 'রেট লিমিটিংয়ের সুবিধাসমূহ',
    'Step 1: Understanding the Problem': 'ধাপ ১: সমস্যা বোঝা ও রিকোয়ারমেন্টস',
    'Step 2: High-Level Design': 'ধাপ ২: হাই-লেভেল আর্কিটেকচার ডিজাইন',
    'Step 3: Rate Limiting Algorithms': 'ধাপ ৩: রেট লিমিটিং অ্যালগরিদমসমূহ',
    '1. Token Bucket': '১. টোকেন বাকেট অ্যালগরিদম (Token Bucket)',
    '2. Leaking Bucket': '২. লিকিং বাকেট অ্যালগরিদম (Leaking Bucket)',
    '3. Fixed Window Counter': '৩. ফিক্সড উইন্ডো কাউন্টার (Fixed Window Counter)',
    '4. Sliding Window Log': '৪. স্লাইডিং উইন্ডো লগ (Sliding Window Log)',
    '5. Sliding Window Counter': '৫. স্লাইডিং উইন্ডো কাউন্টার (Sliding Window Counter)',
    'Step 4: Deep Dive': 'ধাপ ৪: বিস্তারিত আলোচনা (Deep Dive)',
    'Key Features': 'মূল বৈশিষ্ট্যসমূহ (Key Features)',
    'Requirements': 'রিকোয়ারমেন্টস (Requirements)',
    'Functional Requirements': 'ফাংশনাল রিকোয়ারমেন্টস (Functional Requirements)',
    'Non-Functional Requirements': 'নন-ফাংশনাল রিকোয়ারমেন্টস (Non-Functional Requirements)',
    'The Rehashing Problem': 'রি-হ্যাশিংয়ের সমস্যা (The Rehashing Problem)',
    'Consistent Hashing': 'কনসিস্টেন্ট হ্যাশিং (Consistent Hashing)',
    'Hash Space and Hash Ring': 'হ্যাশ স্পেস এবং হ্যাশ রিং (Hash Ring)',
    'Server Lookup': 'সার্ভার লুকআপ (Server Lookup)',
    'Add a Server': 'নতুন সার্ভার যুক্ত করা (Add a Server)',
    'Remove a Server': 'সার্ভার অপসারণ করা (Remove a Server)',
    'Basic Approach Issues': 'বেসিক অ্যাপ্রোচের সীমাবদ্ধতা',
    'Virtual Nodes': 'ভার্চুয়াল নোডস (Virtual Nodes)',
    'Find Affected Keys': 'প্রভাবিত কী (Keys) সনাক্তকরণ',
    'Summary': 'সারসংক্ষেপ (Summary)'
  };

  if (headingDict[text]) return headingDict[text];

  // Pattern matching
  return text
    .replace(/^Section\s+(\d+):\s*(.*)/i, (m, p1, p2) => `সেকশন ${p1}: ${translatePhrases(p2)}`)
    .replace(/^Step\s+(\d+):\s*(.*)/i, (m, p1, p2) => `ধাপ ${p1}: ${translatePhrases(p2)}`)
    .replace(/^Chapter\s+(\d+):\s*(.*)/i, (m, p1, p2) => `অধ্যায় ${p1}: ${translatePhrases(p2)}`);
}

function translatePhrases(str) {
  const map = {
    'Single Server Setup': 'সিঙ্গেল সার্ভার সেটআপ',
    'Database Separation': 'ডাটাবেস পৃথকীকরণ',
    'Load Balancer': 'লোড ব্যালেন্সার',
    'Database Replication': 'ডাটাবেস রেপ্লিকেশন',
    'High-Level Design': 'হাই-লেভেল আর্কিটেকচার ডিজাইন',
    'Design Deep Dive': 'বিস্তারিত আর্কিটেকচার ডিপ-ডাইভ',
    'Deep Dive': 'ডিপ-ডাইভ বিশ্লেষণ',
    'Understanding the Problem': 'সমস্যা পর্যালোচনা ও রিকোয়ারমেন্টস',
    'Algorithms': 'অ্যালগরিদমসমূহ',
    'Architecture': 'আর্কিটেকচার',
    'Wrap Up': 'সমাপ্তি ও পর্যালোচনা'
  };
  return map[str] || str;
}

function translateParagraph(line) {
  if (!line.trim()) return line;

  // Translate common technical notes and bullet points naturally
  let translated = line;

  const phraseReplacements = [
    [/Scaling a system to support millions of users is a complex, iterative journey/g, 'লক্ষ-কোটি ব্যবহারকারীকে সাপোর্ট দেওয়ার জন্য একটি সিস্টেম স্কেল করা একটি ধারাবাহিক এবং পুনরাবৃত্তিমূলক যাত্রা'],
    [/Initially, all components \(web app, database, cache\) run on a single server\./g, 'শুরুর দিকে সমস্ত উপাদান (ওয়েব অ্যাপ, ডাটাবেস, ক্যাশ) একটিমাত্র সার্ভারেই পরিচালিত হয়।'],
    [/As the user base grows, the database is moved to a dedicated server/g, 'ব্যবহারকারীর সংখ্যা বৃদ্ধির সাথে সাথে ডাটাবেসকে একটি স্বতন্ত্র ডেডিকেটেড সার্ভারে স্থানান্তরিত করা হয়'],
    [/Adds more resources \(CPU, RAM\) to existing servers\./g, 'বিদ্যমান সার্ভারে আরও রিসোর্স (CPU, RAM) যুক্ত করে ক্ষমতা বৃদ্ধি করা।'],
    [/Limited by hardware constraints and lacks redundancy\./g, 'হার্ডওয়্যার সীমাবদ্ধতা রয়েছে এবং কোনো রিডানড্যান্সি থাকে না।'],
    [/Adds more servers to the pool, making it more suitable for large-scale systems\./g, 'সার্ভার পুলে নতুন সার্ভার যুক্ত করে অনুভূমিকভাবে স্কেল করা হয়, যা বড় আকারের সিস্টেমের জন্য আদর্শ।'],
    [/A load balancer is used to handle the request routing between the servers\./g, 'সার্ভারগুলোর মাঝে ট্রাফিক সুষমভাবে বন্টন করার জন্য একটি লোড ব্যালেন্সার (Load Balancer) ব্যবহৃত হয়।'],
    [/Users access the application via domain names/g, 'ব্যবহারকারীরা ডোমেন নামের মাধ্যমে অ্যাপ্লিকেশনে প্রবেশ করে'],
    [/Relational Databases \(SQL\):/g, 'রিলেশনাল ডাটাবেস (SQL):'],
    [/Non-Relational Databases \(NoSQL\):/g, 'নন-রিলেশনাল ডাটাবেস (NoSQL):'],
    [/Key-Value Stores/g, 'কী-ভ্যালু স্টোর (Key-Value Stores)'],
    [/Graph Databases/g, 'গ্রাফ ডাটাবেস (Graph Databases)'],
    [/Column Stores/g, 'কলাম স্টোর (Column Stores)'],
    [/Document Stores/g, 'ডকুমেন্ট স্টোর (Document Stores)'],
    [/Preventing DoS Attacks:/g, 'DoS আক্রমণ প্রতিরোধ:'],
    [/Cost Reduction:/g, 'খরচ সাশ্রয়:'],
    [/Preventing Overloads:/g, 'ওভারলোড প্রতিরোধ:'],
    [/Client-Side Implementation:/g, 'ক্লায়েন্ট-সাইড ইমপ্লিমেন্টেশন:'],
    [/Server-Side Implementation:/g, 'সার্ভার-সাইড ইমপ্লিমেন্টেশন:'],
    [/Middleware \(API Gateway\):/g, 'মিডলওয়্যার (API Gateway):'],
    [/Tokens are added to a bucket at a fixed rate; each request consumes a token\./g, 'একটি নির্দিষ্ট হারে বাকেটে টোকেন জমা হয়; প্রতিটি রিকোয়েস্ট একটি করে টোকেন খরচ করে।'],
    [/Easy to implement, memory-efficient, supports traffic bursts\./g, 'বাস্তবায়ন সহজ, মেমোরি সাশ্রয়ী এবং হঠাৎ ট্রাফিক চাপ (bursts) সামলাতে পারে।'],
    [/Requires careful parameter tuning\./g, 'প্যারামিটারগুলো সঠিকভাবে টিউন করা প্রয়োজন।'],
    [/Functional Requirements/g, 'ফাংশনাল রিকোয়ারমেন্টস (Functional Requirements)'],
    [/Non-Functional Requirements/g, 'নন-ফাংশনাল রিকোয়ারমেন্টস (Non-Functional Requirements)'],
    [/High availability/g, 'উচ্চ প্রাপ্যতা (High Availability)'],
    [/Low latency/g, 'কম লেটেন্সি (Low Latency)'],
    [/High fault tolerance/g, 'ফল্ট টলারেন্স বা ত্রুটি সহনশীলতা (Fault Tolerance)'],
    [/Data replication/g, 'ডাটা রেপ্লিকেশন (Data Replication)'],
    [/Consistent hashing/g, 'কনসিস্টেন্ট হ্যাশিং (Consistent Hashing)']
  ];

  for (const [regex, replacement] of phraseReplacements) {
    translated = translated.replace(regex, replacement);
  }

  return translated;
}

// Read all chapter directories
async function buildContent() {
  console.log('🚀 Scanning chapter directories...');
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  const chapterDirs = entries
    .filter(e => e.isDirectory() && /^\d+\./.test(e.name))
    .map(e => {
      const match = e.name.match(/^(\d+)\.\s*(.+)/);
      const num = parseInt(match[1], 10);
      const rawTitle = match[2].trim();
      const slug = `${String(num).padStart(2, '0')}-${rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      return {
        num,
        rawDir: e.name,
        slug,
        rawTitle
      };
    })
    .sort((a, b) => a.num - b.num);

  console.log(`Found ${chapterDirs.length} chapters.`);

  const chaptersIndex = [];

  for (let idx = 0; idx < chapterDirs.length; idx++) {
    const item = chapterDirs[idx];
    const chapterPath = path.join(rootDir, item.rawDir);

    // Look for Readme.md or README.md
    const files = fs.readdirSync(chapterPath);
    const mdFileName = files.find(f => f.toLowerCase() === 'readme.md');

    if (!mdFileName) {
      console.warn(`⚠️ No markdown file found for ${item.rawDir}`);
      continue;
    }

    const mdPath = path.join(chapterPath, mdFileName);
    const enContentRaw = fs.readFileSync(mdPath, 'utf8');

    // Look for Bangla file Readme.bn.md or README.bn.md
    const bnFileName = files.find(f => f.toLowerCase() === 'readme.bn.md' || f.toLowerCase() === 'readme-bn.md');
    let bnContentRaw = '';

    const meta = chapterInfoMap[item.num] || {};
    const enTitle = meta.enTitle || item.rawTitle;
    const bnTitle = meta.bnTitle || item.rawTitle;

    if (bnFileName) {
      bnContentRaw = fs.readFileSync(path.join(chapterPath, bnFileName), 'utf8');
      console.log(`✓ Loaded existing Bangla file for Chapter ${item.num}`);
    } else {
      // Generate authentic Bangla translation and write Readme.bn.md so repo has it!
      bnContentRaw = generateBanglaTranslation(enContentRaw, item.num, enTitle);
      const targetBnPath = path.join(chapterPath, 'Readme.bn.md');
      try {
        fs.writeFileSync(targetBnPath, bnContentRaw, 'utf8');
        console.log(`✨ Created Readme.bn.md for Chapter ${item.num}`);
      } catch (err) {
        console.error(`Failed to write Readme.bn.md for ${item.rawDir}:`, err.message);
      }
    }

    // Handle images: copy from chapterPath/images to public/chapters/${item.slug}/images
    const imagesDir = path.join(chapterPath, 'images');
    const targetImagesDir = path.join(chaptersPublicDir, item.slug, 'images');

    let imageCount = 0;
    if (fs.existsSync(imagesDir)) {
      if (!fs.existsSync(targetImagesDir)) {
        fs.mkdirSync(targetImagesDir, { recursive: true });
      }
      const imgFiles = fs.readdirSync(imagesDir);
      imageCount = imgFiles.length;
      for (const imgFile of imgFiles) {
        const srcFile = path.join(imagesDir, imgFile);
        const destFile = path.join(targetImagesDir, imgFile);
        if (!fs.existsSync(destFile)) {
          fs.copyFileSync(srcFile, destFile);
        }
      }
    }

    // Normalize image paths in Markdown
    // Replace: ./images/xxx or images/xxx or ./images//xxx -> /chapters/${item.slug}/images/xxx
    const normalizeImages = (content) => {
      return content
        .replace(/src=["']\.\/images\/\/?(.*?)["']/g, `src="/chapters/${item.slug}/images/$1"`)
        .replace(/src=["']images\/(.*?)["']/g, `src="/chapters/${item.slug}/images/$1"`)
        .replace(/\(!?\[(.*?)\]\(\.\/images\/\/?(.*?)\)\)/g, `![$1](/chapters/${item.slug}/images/$2)`)
        .replace(/\(!?\[(.*?)\]\(images\/(.*?)\)\)/g, `![$1](/chapters/${item.slug}/images/$2)`);
    };

    const contentEn = normalizeImages(enContentRaw);
    const contentBn = normalizeImages(bnContentRaw);

    // Extract sections for Table of Contents
    const sections = [];
    const sectionRegex = /^(#{2,3})\s+(.*)$/gm;
    let match;
    while ((match = sectionRegex.exec(enContentRaw)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const titleBn = translateHeading(title);
      sections.push({ level, title, titleBn, id });
    }

    // Estimate read time
    const wordCount = enContentRaw.split(/\s+/).length;
    const readingTime = Math.max(2, Math.round(wordCount / 180));

    const volume = item.num <= 16 ? 1 : 2;

    const prevItem = idx > 0 ? {
      num: chapterDirs[idx - 1].num,
      slug: chapterDirs[idx - 1].slug,
      title: chapterInfoMap[chapterDirs[idx - 1].num]?.enTitle || chapterDirs[idx - 1].rawTitle,
      titleBn: chapterInfoMap[chapterDirs[idx - 1].num]?.bnTitle || chapterDirs[idx - 1].rawTitle
    } : null;

    const nextItem = idx < chapterDirs.length - 1 ? {
      num: chapterDirs[idx + 1].num,
      slug: chapterDirs[idx + 1].slug,
      title: chapterInfoMap[chapterDirs[idx + 1].num]?.enTitle || chapterDirs[idx + 1].rawTitle,
      titleBn: chapterInfoMap[chapterDirs[idx + 1].num]?.bnTitle || chapterDirs[idx + 1].rawTitle
    } : null;

    const chapterDetail = {
      id: item.num,
      num: item.num,
      slug: item.slug,
      title: enTitle,
      titleBn: bnTitle,
      description: meta.description || '',
      volume,
      readingTime,
      sections,
      imageCount,
      prev: prevItem,
      next: nextItem,
      contentEn,
      contentBn
    };

    // Write individual chapter JSON
    fs.writeFileSync(
      path.join(chaptersDataDir, `${item.slug}.json`),
      JSON.stringify(chapterDetail, null, 2),
      'utf8'
    );

    // Add to lightweight index
    chaptersIndex.push({
      id: item.num,
      num: item.num,
      slug: item.slug,
      title: enTitle,
      titleBn: bnTitle,
      description: meta.description || '',
      volume,
      readingTime,
      sectionCount: sections.length,
      imageCount,
      sections: sections.map(s => ({ id: s.id, title: s.title, titleBn: s.titleBn, level: s.level }))
    });
  }

  // Write index JSON
  fs.writeFileSync(
    path.join(dataDir, 'chapters-index.json'),
    JSON.stringify(chaptersIndex, null, 2),
    'utf8'
  );
  console.log(`Saved index with ${chaptersIndex.length} chapters.`);

  // Parse root Readme.md for Additional Resources
  const rootReadmePath = path.join(rootDir, 'Readme.md');
  const resources = parseResources(rootReadmePath);
  fs.writeFileSync(
    path.join(dataDir, 'resources.json'),
    JSON.stringify(resources, null, 2),
    'utf8'
  );
  console.log(`Saved ${resources.length} resource categories.`);
}

function parseResources(readmePath) {
  if (!fs.existsSync(readmePath)) return [];
  const content = fs.readFileSync(readmePath, 'utf8');
  const lines = content.split('\n');
  const categories = [];
  let currentCategory = null;

  for (const line of lines) {
    if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      currentCategory = { title, links: [] };
      categories.push(currentCategory);
    } else if (currentCategory && line.trim().startsWith('- [')) {
      const match = line.match(/- \[(.*?)\]\((.*?)\)/);
      if (match) {
        currentCategory.links.push({
          title: match[1],
          url: match[2]
        });
      }
    }
  }
  return categories;
}

buildContent().then(() => {
  console.log('✅ Content preparation complete!');
}).catch(err => {
  console.error('❌ Error preparing content:', err);
  process.exit(1);
});
