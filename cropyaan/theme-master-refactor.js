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
  console.log(`Processing: ${file}`);

  // --- 1. TAILWIND CLASS REPLACEMENTS ---
  // Guard against double-processing: only replace bare classes, not ones already prefixed with dark:
  content = content.replace(/(?<!dark:)bg-\[#0a0a0a\]/g, 'bg-slate-50 dark:bg-[#0a0a0a]');

  // Replace bare text-white / text-zinc-X only when NOT already preceded by dark:
  // This prevents generating "dark:text-slate-900 dark:text-white" double-dark patterns
  content = content.replace(/(?<!dark:)text-white(?=[\s"'])/g, 'text-slate-900 dark:text-white');
  content = content.replace(/(?<!dark:)text-zinc-500(?=[\s"'])/g, 'text-slate-600 dark:text-zinc-500');
  content = content.replace(/(?<!dark:)text-zinc-400(?=[\s"'])/g, 'text-slate-500 dark:text-zinc-400');
  content = content.replace(/(?<!dark:)text-zinc-300(?=[\s"'])/g, 'text-slate-700 dark:text-zinc-300');

  // --- 2. HEX & HARDCODED BACKGROUNDS TO VARIABLES ---
  // Gradient/inline-style hex values → surface-aware variables so they work in light mode too
  content = content.replace(/#0a0a0acc/gi, 'var(--surface-bg-cc)');
  content = content.replace(/#0a0a0a88/gi, 'var(--surface-bg-88)');
  // Remaining bare #0a0a0a → context-dependent:
  //   Inside a linear-gradient or as a panel background → use --surface-bg (theme-aware)
  //   These appear as the solid colour stops in AgriSplit-style edge fades
  content = content.replace(
    /linear-gradient\(([^)]*?)#0a0a0a([^)]*?)\)/g,
    (match, before, after) =>
      `linear-gradient(${before}var(--surface-bg)${after})`
  );
  // Any remaining bare #0a0a0a (solid backgrounds, not inside gradients) → --surface-bg
  content = content.replace(/#0a0a0a/gi, 'var(--surface-bg)');
  content = content.replace(/#0d0d0d/gi, 'var(--surface-bg)');

  content = content.replace(/(?<!dark:)bg-\[#0b0b0b\]/g, 'bg-slate-50 dark:bg-[var(--bg-main)]');
  content = content.replace(/(?<!dark:)bg-\[#111\]/g,     'bg-white dark:bg-[var(--bg-main)]');
  content = content.replace(/(?<!dark:)bg-\[#111111\]/g,  'bg-white dark:bg-[var(--bg-main)]');

  // --- 3. RGBA OVERLAYS ---
  // IMPORTANT: rgba(0,0,0,X) and rgba(255,255,255,X) are NOT the same thing.
  // We map them to separate variables so dark and light overlays stay distinct.

  // Black overlays (rgba(0,0,0,X)) — used for darkening/image tints
  const blackOverlayMap = {
    '0.02':  'var(--overlay-2)',
    '0.025': 'var(--overlay-25)',
    '0.05':  'var(--overlay-5)',
    '0.06':  'var(--overlay-6)',
    '0.07':  'var(--overlay-7)',
    '0.1':   'var(--overlay-10)',
    '0.15':  'var(--overlay-15)',
    '0.18':  'var(--image-overlay)',   // light-mode image tint
    '0.3':   'var(--hero-overlay-1)',
    '0.38':  'var(--hero-overlay-2)',
    '0.45':  'var(--image-overlay)',   // dark-mode image tint
    '0.5':   'var(--hero-overlay-2)',
    '0.55':  'var(--hero-overlay-2)',
    '0.8':   'var(--overlay-80)',
  };

  // White overlays (rgba(255,255,255,X)) — used for glass/highlight effects
  const whiteOverlayMap = {
    '0.02':  'var(--white-overlay-2)',
    '0.025': 'var(--white-overlay-25)',
    '0.05':  'var(--white-overlay-5)',
    '0.06':  'var(--white-overlay-6)',
    '0.07':  'var(--white-overlay-7)',
    '0.1':   'var(--white-overlay-10)',
    '0.15':  'var(--white-overlay-15)',
    '0.3':   'var(--white-overlay-30)',
    '0.5':   'var(--white-overlay-50)',
    '0.8':   'var(--white-overlay-80)',
  };

  Object.entries(blackOverlayMap).forEach(([opacity, variable]) => {
    const regex = new RegExp(
      `rgba\\(0,\\s*0,\\s*0,\\s*${opacity.replace('.', '\\.')}\\)`, 'g'
    );
    content = content.replace(regex, variable);
  });

  Object.entries(whiteOverlayMap).forEach(([opacity, variable]) => {
    const regex = new RegExp(
      `rgba\\(255,\\s*255,\\s*255,\\s*${opacity.replace('.', '\\.')}\\)`, 'g'
    );
    content = content.replace(regex, variable);
  });

  // --- 4. GREEN ACCENTS ---
  const greenMap = { '0.04': '4', '0.05': '5', '0.08': '8', '0.2': '20', '0.25': '25', '0.3': '30' };
  Object.entries(greenMap).forEach(([opacity, num]) => {
    const regex = new RegExp(
      `rgba\\(34,\\s*197,\\s*94,\\s*${opacity.replace('.', '\\.')}\\)`, 'g'
    );
    content = content.replace(regex, `var(--green-${num})`);
  });

  // --- 5. TEXT & BORDER REFINEMENTS ---
  content = content.replace(/rgba\(161,\s*161,\s*170,\s*(?:1|0\.[0-9]+)\)/g, 'var(--color-text-muted)');
  content = content.replace(/color:\s*["']#a1a1aa["']/g, 'color: "var(--color-text-muted)"');
  content = content.replace(/border-white\/(?:10|5)/g, (m) => `border-[var(--overlay-${m.includes('10') ? '10' : '5'})]`);
  content = content.replace(/bg-white\/(?:10|5)/g,    (m) => `bg-[var(--overlay-${m.includes('10') ? '10' : '5'})]`);

  // --- 6. DARK-ONLY HOVER COLOURS → theme-aware equivalents ---
  // group-hover:text-zinc-200 is a hard-coded light text for dark backgrounds.
  // Replace with the theme variable so it reads correctly in both modes.
  content = content.replace(/group-hover:text-zinc-200/g, 'group-hover:text-[var(--color-text)]');
  // Same pattern for non-group hover
  content = content.replace(/hover:text-zinc-200/g, 'hover:text-[var(--color-text)]');

  // --- 7. IMAGE PANEL GRADIENT VARIABLES ---
  // Replace leftover var(--bg-main-cc) / var(--bg-main-88) / var(--hero-overlay-2)
  // that appear inside linear-gradients (AgriSplit-style edge fades) with the
  // theme-aware surface variables added in step 2.
  content = content.replace(/var\(--bg-main-cc\)/g, 'var(--surface-bg-cc)');
  content = content.replace(/var\(--bg-main-88\)/g, 'var(--surface-bg-88)');
  // --hero-overlay-2 used as a solid image darkening overlay → theme-aware image-overlay
  content = content.replace(
    /style=\{\{[^}]*background:\s*["']var\(--hero-overlay-2\)["'][^}]*\}\}/g,
    (match) => match.replace('var(--hero-overlay-2)', 'var(--image-overlay)')
  );

  // --- 8. SPECIAL LOGIC ---
  if (file === 'Home.jsx') {
    content = content.replace(/background:\s*"var\(--overlay-25\)"/g, 'background: "var(--bg-main)"');
  }
  content = content.replace(
    /color:\s*hovered\s*\?\s*"var\(--overlay-80\)"\s*:/g,
    'color: hovered ? "var(--color-text)" :'
  );

  // NOTE: bg-slate-50 / bg-slate-100 removal (old step 6) has been intentionally removed.
  // These are valid light-mode backgrounds added in step 1 and should not be stripped.

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("🚀 ALL REFACTORING PHASES COMPLETE — light & dark theme safe!");


