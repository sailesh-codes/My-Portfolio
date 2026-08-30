const fs = require('fs');
const path = require('path');

const fontDirs = ['fonts', 'public/fonts'];
fontDirs.forEach(dir => {
  const dirPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const fontFile = path.join(dirPath, 'GeistPixel-Circle.woff2');
  if (!fs.existsSync(fontFile)) {
    // Create an empty fallback woff2 file if not present
    fs.writeFileSync(fontFile, Buffer.alloc(0));
    console.log(`Created placeholder for ${fontFile}`);
  }
});
