import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import fs from "fs"

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

