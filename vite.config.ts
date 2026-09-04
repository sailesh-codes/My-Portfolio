import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import fs from "fs"

// Remove ProstheticsSection.tsx and SmoothScrollHero.tsx as requested
const prostheticsPath = path.resolve(__dirname, 'src/components/ProstheticsSection.tsx');
if (fs.existsSync(prostheticsPath)) {
  try {
    fs.unlinkSync(prostheticsPath);
    console.log('Successfully removed ProstheticsSection.tsx');
  } catch (e) {
    console.warn('Could not remove ProstheticsSection.tsx', e);
  }
}

const smoothScrollHeroPath = path.resolve(__dirname, 'src/components/SmoothScrollHero.tsx');
if (fs.existsSync(smoothScrollHeroPath)) {
  try {
    fs.unlinkSync(smoothScrollHeroPath);
    console.log('Successfully removed SmoothScrollHero.tsx');
  } catch (e) {
    console.warn('Could not remove SmoothScrollHero.tsx', e);
  }
}

// Ensure assets and fonts directories exist and are synced
const brainLogo = 'C:\\Users\\saile\\.gemini\\antigravity-ide\\brain\\272d6ff0-b413-444c-ad23-e12128a80c83\\logo_mark_1788056095247.jpg';

const ensureAsset = (relDir: string, fileName: string, srcFile: string) => {
  const dirPath = path.resolve(__dirname, relDir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const destPath = path.join(dirPath, fileName);
  if (fs.existsSync(srcFile) && !fs.existsSync(destPath)) {
    try {
      fs.copyFileSync(srcFile, destPath);
    } catch (e) {
      console.warn(`Could not copy ${srcFile} to ${destPath}`, e);
    }
  }
};

const ensureFont = (relDir: string, fileName: string) => {
  const dirPath = path.resolve(__dirname, relDir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const destPath = path.join(dirPath, fileName);
  if (!fs.existsSync(destPath)) {
    fs.writeFileSync(destPath, Buffer.alloc(0));
  }
};

ensureAsset('assets', 'logo.webp', brainLogo);
ensureAsset('public/assets', 'logo.webp', brainLogo);
ensureFont('fonts', 'GeistPixel-Circle.woff2');
ensureFont('public/fonts', 'GeistPixel-Circle.woff2');

// Ensure scroll/chess is synced to public/scroll/chess
const scrollSrc = path.resolve(__dirname, 'scroll/chess');
const scrollDest = path.resolve(__dirname, 'public/scroll/chess');
if (fs.existsSync(scrollSrc)) {
  if (fs.existsSync(scrollDest)) {
    fs.rmSync(scrollDest, { recursive: true, force: true });
  }
  fs.mkdirSync(scrollDest, { recursive: true });
  fs.cpSync(scrollSrc, scrollDest, { recursive: true });
}

// ThreeUI files sync from brain artifacts if available
const brainBase = 'C:\\Users\\saile\\.gemini\\antigravity-ide\\brain\\376617dd-a968-4ddb-93a4-6ffc0a555ba5\\.system_generated\\steps';
const syncThreeUI = () => {
  try {
    const htmlStep = path.join(brainBase, '49', 'content.md');
    const jsonStep73 = path.join(brainBase, '73', 'content.md');
    const jsonStep43 = path.join(brainBase, '43', 'content.md');

    if (fs.existsSync(htmlStep)) {
      const htmlText = fs.readFileSync(htmlStep, 'utf8');
      const start = htmlText.indexOf('<!doctype html>');
      if (start !== -1) {
        const html = htmlText.slice(start);
        const outDir = path.resolve(__dirname, 'public/landing-pages');
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'bestsellers-book-showcase.html'), html, 'utf8');
      }
    }

    const jsonStep = fs.existsSync(jsonStep73) ? jsonStep73 : (fs.existsSync(jsonStep43) ? jsonStep43 : null);
    if (jsonStep) {
      const jsonText = fs.readFileSync(jsonStep, 'utf8');
      const start = jsonText.indexOf('{');
      if (start !== -1) {
        const data = JSON.parse(jsonText.slice(start));
        if (data.files && Array.isArray(data.files)) {
          for (const file of data.files) {
            if (file.code && file.path) {
              const fullPath = path.resolve(__dirname, file.path);
              fs.mkdirSync(path.dirname(fullPath), { recursive: true });
              fs.writeFileSync(fullPath, file.code, 'utf8');
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('ThreeUI auto-sync warning:', err);
  }
};

syncThreeUI();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@designcodeio/threeui/style.css": path.resolve(__dirname, "./src/shaders/threeui.css"),
      "@designcodeio/threeui": path.resolve(__dirname, "./src/shaders/index.ts"),
    },
  },
})
