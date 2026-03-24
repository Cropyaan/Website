import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Hardcoded text colors with opacity
  content = content.replace(/rgba\(161,\s*161,\s*170,\s*0\.[0-9]+\)/g, 'var(--color-text-muted)');

  if(file === 'Home.jsx') {
    content = content.replace(/background: "var\(--overlay-25\)"/g, 'background: "var(--bg-main)"');
  }

  // Also replace hardcoded black backgrounds in Login if they exist
  // We don't have bg-[#0b0b0b] everywhere but let's be safe
  content = content.replace(/bg-\[\#0b0b0b\]/g, 'bg-slate-50 dark:bg-[var(--bg-main)]');
  content = content.replace(/bg-\[\#111\]/g, 'bg-white dark:bg-[var(--bg-main)]');
  content = content.replace(/bg-[#111111]/g, 'bg-white dark:bg-[var(--bg-main)]');

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Quaternary Refactoring complete");
