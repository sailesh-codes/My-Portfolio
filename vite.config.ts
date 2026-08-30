import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import fs from "fs"

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
