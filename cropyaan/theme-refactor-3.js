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

  // Hardcoded borders and backgrounds that should be theme-aware overlays
  content = content.replace(/rgba\(255,255,255,0\.07\)/g, 'var(--overlay-10)');
  content = content.replace(/rgba\(255, 255, 255, 0\.07\)/g, 'var(--overlay-10)');
  content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'var(--overlay-5)');
  content = content.replace(/rgba\(255, 255, 255, 0\.05\)/g, 'var(--overlay-5)');
  content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'var(--overlay-10)');
  content = content.replace(/rgba\(255, 255, 255, 0\.1\)/g, 'var(--overlay-10)');
  content = content.replace(/rgba\(255,255,255,0\.15\)/g, 'var(--overlay-15)');
  content = content.replace(/rgba\(255, 255, 255, 0\.15\)/g, 'var(--overlay-15)');
  
  // Tailwind overrides
  content = content.replace(/border-white\/10/g, 'border-[var(--overlay-10)]');
  content = content.replace(/border-white\/5/g, 'border-[var(--overlay-5)]');
  content = content.replace(/bg-white\/5/g, 'bg-[var(--overlay-5)]');
  content = content.replace(/bg-white\/10/g, 'bg-[var(--overlay-10)]');

  // Hardcoded text colors
  content = content.replace(/rgba\(161,161,170,1\)/g, 'var(--color-text-muted)');
  content = content.replace(/rgba\(161, 161, 170, 1\)/g, 'var(--color-text-muted)');
  content = content.replace(/color: "\#a1a1aa"/g, 'color: "var(--color-text-muted)"');
  content = content.replace(/color: hovered \? "var\(--overlay-80\)" :/g, 'color: hovered ? "var(--color-text)" :');

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Tertiary Refactoring complete");
