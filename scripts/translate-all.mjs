import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to delay
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

// Translation API using Chrome Extension endpoint
async function translateBatch(text, retries = 3) {
  if (!text || !text.trim()) return text;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const url = "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=bn&q=" + encodeURIComponent(text);
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      
      const data = await res.json();
      if (Array.isArray(data) && data[0]) {
        return data[0];
      }
      return text;
    } catch (err) {
      if (attempt === retries) {
        console.warn(`Translation attempt ${attempt} failed: ${err.message}. Keeping original.`);
        return text;
      }
      await sleep(500 * attempt);
    }
  }
  return text;
}

// Translate a single chapter markdown
async function translateChapterMarkdown(content, chNum) {
  const lines = content.split('\n');
  const resultLines = new Array(lines.length);
  
  let inCodeBlock = false;
  
  // We collect chunks of text lines to translate in batches
  const pendingIndices = [];
  const pendingTexts = [];

  const flushPending = async () => {
    if (pendingTexts.length === 0) return;
    
    // Join with newline
    const combined = pendingTexts.join('\n');
    const translatedCombined = await translateBatch(combined);
    const translatedParts = translatedCombined.split('\n');
    
    // If length matches, map 1-to-1
    if (translatedParts.length === pendingIndices.length) {
      for (let k = 0; k < pendingIndices.length; k++) {
        resultLines[pendingIndices[k]] = translatedParts[k];
      }
    } else {
      // Fallback: translate individually if newline splitting mismatched
      for (let k = 0; k < pendingIndices.length; k++) {
        const single = await translateBatch(pendingTexts[k]);
        resultLines[pendingIndices[k]] = single;
        await sleep(50);
      }
    }
    
    pendingIndices.length = 0;
    pendingTexts.length = 0;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Toggle code blocks
    if (trimmed.startsWith('```')) {
      await flushPending();
      inCodeBlock = !inCodeBlock;
      resultLines[i] = line;
      continue;
    }
    if (inCodeBlock) {
      resultLines[i] = line;
      continue;
    }

    // Skip HTML tags, images, empty lines, and separators
    if (
      !trimmed ||
      trimmed === '---' ||
      trimmed === '***' ||
      line.includes('<img ') ||
      line.includes('<div') ||
      line.includes('</div>') ||
      line.includes('</span>') ||
      /^\s*!\[.*?\]\(.*?\)\s*$/.test(trimmed)
    ) {
      await flushPending();
      resultLines[i] = line;
      continue;
    }

    // Markdown Headings
    if (/^#{1,6}\s+/.test(line)) {
      await flushPending();
      const match = line.match(/^(#{1,6})\s+(.*)$/);
      const level = match[1];
      const title = match[2];
      const translatedTitle = await translateBatch(title);
      resultLines[i] = `${level} ${translatedTitle}`;
      await sleep(30);
      continue;
    }

    // Regular lines (paragraphs, bullet points, table lines)
    pendingIndices.push(i);
    pendingTexts.push(line);

    // Batch size of 15 lines
    if (pendingTexts.length >= 15) {
      await flushPending();
      await sleep(80);
    }
  }

  // Flush remaining
  await flushPending();

  return resultLines.join('\n');
}

async function run() {
  console.log('🌐 Starting complete Bangla translation for all 28 chapters...\n');
  
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const chapterDirs = entries
    .filter(e => e.isDirectory() && /^\d+\./.test(e.name))
    .sort((a, b) => {
      const numA = parseInt(a.name.match(/^(\d+)/)[1], 10);
      const numB = parseInt(b.name.match(/^(\d+)/)[1], 10);
      return numA - numB;
    });

  console.log(`Found ${chapterDirs.length} chapters to process.`);

  for (let idx = 0; idx < chapterDirs.length; idx++) {
    const dir = chapterDirs[idx];
    const chapterPath = path.join(rootDir, dir.name);
    const files = fs.readdirSync(chapterPath);
    const enMdFile = files.find(f => f.toLowerCase() === 'readme.md' && !f.includes('.bn'));

    if (!enMdFile) {
      console.warn(`No Readme.md in ${dir.name}`);
      continue;
    }

    const num = parseInt(dir.name.match(/^(\d+)/)[1], 10);
    console.log(`[${idx + 1}/28] Translating Chapter ${num}: ${dir.name}...`);

    const enContent = fs.readFileSync(path.join(chapterPath, enMdFile), 'utf8');
    const bnTranslated = await translateChapterMarkdown(enContent, num);

    // Save as Readme.bn.md
    const targetBnFile = path.join(chapterPath, 'Readme.bn.md');
    fs.writeFileSync(targetBnFile, bnTranslated, 'utf8');
    console.log(`  ✓ Saved ${targetBnFile}`);
    
    // Pause briefly between chapters
    await sleep(200);
  }

  console.log('\n🎉 All 28 chapters translated into Bangla successfully!');
}

run().catch(err => {
  console.error('Fatal error in translation:', err);
  process.exit(1);
});
