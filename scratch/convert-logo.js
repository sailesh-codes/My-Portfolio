const fs = require('fs');
const path = require('path');

const srcImg = 'C:\\Users\\saile\\.gemini\\antigravity-ide\\brain\\272d6ff0-b413-444c-ad23-e12128a80c83\\logo_mark_1788056095247.jpg';
const destDirs = ['assets', 'public/assets'];

destDirs.forEach(dir => {
  const dirPath = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

try {
  const sharp = require('sharp');
  destDirs.forEach(dir => {
    const destFile = path.resolve(__dirname, '..', dir, 'logo.webp');
    sharp(srcImg)
      .resize(104, 104)
      .webp({ quality: 90 })
      .toFile(destFile, (err, info) => {
        if (err) {
          console.error(`Error saving to ${destFile}:`, err);
        } else {
          console.log(`Saved logo.webp to ${destFile}:`, info);
        }
      });
  });
} catch (e) {
  // If sharp isn't available directly via script, copy as fallback
  destDirs.forEach(dir => {
    const destFile = path.resolve(__dirname, '..', dir, 'logo.webp');
    if (fs.existsSync(srcImg)) {
      fs.copyFileSync(srcImg, destFile);
      console.log(`Copied logo to ${destFile}`);
    }
  });
}
