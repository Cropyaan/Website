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

  // Remove the rigid slate-50 background so the fading grey `body` gradient shines through
  // Note: we leave dark:bg-[var(--bg-main)] which tailwind will apply via .dark class.
  // In light mode, it will just default to transparent, inheriting the body gradient!
  content = content.replace(/bg-slate-50 /g, '');
  content = content.replace(/bg-slate-100 /g, '');

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Removed hardcoded light backgrounds");
