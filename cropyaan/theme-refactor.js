// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const componentsDir = path.join(__dirname, 'src', 'components');
// const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

// files.forEach(file => {
//   const filePath = path.join(componentsDir, file);
//   let content = fs.readFileSync(filePath, 'utf-8');

//   // Tailwind class replacements
//   content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-slate-50 dark:bg-[#0a0a0a]');
//   content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
//   content = content.replace(/text-zinc-500/g, 'text-slate-600 dark:text-zinc-500');
//   content = content.replace(/text-zinc-400/g, 'text-slate-500 dark:text-zinc-400');
//   content = content.replace(/text-zinc-300/g, 'text-slate-700 dark:text-zinc-300');
  
//   // Inline styles replacements for color names and hex
//   content = content.replace(/color:\s*['"]#fff['"]/g, 'color: "var(--color-text)"');
//   content = content.replace(/color:\s*['"]white['"]/g, 'color: "var(--color-text)"');
//   content = content.replace(/background:\s*['"]#0a0a0a['"]/g, 'background: "var(--bg-main)"');
  
//   // rgba replacements for inline styles
//   content = content.replace(/['"]rgba\(255,255,255,0\.02\)['"]/g, '"var(--overlay-2)"');
//   content = content.replace(/['"]rgba\(255,255,255,0\.025\)['"]/g, '"var(--overlay-25)"');
//   content = content.replace(/['"]rgba\(255,255,255,0\.05\)['"]/g, '"var(--overlay-5)"');
//   content = content.replace(/['"]rgba\(255,255,255,0\.06\)['"]/g, '"var(--overlay-6)"');
//   content = content.replace(/['"]rgba\(255,255,255,0\.07\)['"]/g, '"var(--overlay-7)"');
//   content = content.replace(/['"]rgba\(255,255,255,0\.1\)['"]/g, '"var(--overlay-10)"');
//   content = content.replace(/['"]rgba\(255,255,255,0\.15\)['"]/g, '"var(--overlay-15)"');
//   content = content.replace(/['"]rgba\(255,255,255,0\.8\)['"]/g, '"var(--overlay-80)"');
  
//   // green transparent layers (which need slightly different opacities in light mode for visible contrast)
//   content = content.replace(/['"]rgba\(34,197,94,0\.04\)['"]/g, '"var(--green-4)"');
//   content = content.replace(/['"]rgba\(34,197,94,0\.05\)['"]/g, '"var(--green-5)"');
//   content = content.replace(/['"]rgba\(34,197,94,0\.08\)['"]/g, '"var(--green-8)"');
//   content = content.replace(/['"]rgba\(34,197,94,0\.2\)['"]/g, '"var(--green-20)"');
//   content = content.replace(/['"]rgba\(34,197,94,0\.25\)['"]/g, '"var(--green-25)"');
//   content = content.replace(/['"]rgba\(34,197,94,0\.3\)['"]/g, '"var(--green-30)"');

//   // Solid colors in strings
//   content = content.replace(/['"]#0a0a0a['"]/g, '"var(--bg-main)"');
//   content = content.replace(/['"]#fff['"]/g, '"var(--color-text)"');
  
//   // Specific fix for separators
//   content = content.replace(/background:\s*['"]linear-gradient\(90deg, transparent 0%, #22c55e44 30%, #22c55e88 50%, #22c55e44 70%, transparent 100%\)['"]/g, 'background: "var(--sep-grad)"');

//   fs.writeFileSync(filePath, content, 'utf-8');
// });

// console.log("Refactoring complete");
