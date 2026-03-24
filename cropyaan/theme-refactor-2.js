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

  // Hardcoded Hex Gradients
  content = content.replace(/#0a0a0acc/g, 'var(--bg-main-cc)');
  content = content.replace(/#0a0a0a88/g, 'var(--bg-main-88)');
  content = content.replace(/#0a0a0a/g, 'var(--bg-main)');
  content = content.replace(/#0d0d0d/g, 'var(--bg-main)');

  // Hardcoded rgba black overlays
  content = content.replace(/rgba\(0,0,0,0\.3\)/g, 'var(--hero-overlay-1)');
  content = content.replace(/rgba\(0,0,0,0\.55\)/g, 'var(--hero-overlay-2)');
  content = content.replace(/rgba\(0,0,0,0\.38\)/g, 'var(--hero-overlay-2)');
  content = content.replace(/rgba\(0,0,0,0\.5\)/g, 'var(--hero-overlay-2)');
  content = content.replace(/rgba\(0,0,0,0\.9\)/g, 'var(--bg-main-cc)');
  
  // also catch the ones with spaces inside the gradient
  content = content.replace(/rgba\(0, 0, 0, 0\.3\)/g, 'var(--hero-overlay-1)');
  content = content.replace(/rgba\(0, 0, 0, 0\.55\)/g, 'var(--hero-overlay-2)');

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log("Secondary Refactoring complete");
