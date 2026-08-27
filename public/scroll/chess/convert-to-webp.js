// convert-to-webp.js
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Priority order for input directories: upscaled_images -> frames-png -> current dir
let inputDir = __dirname;
if (fs.existsSync(path.join(__dirname, "upscaled_images"))) {
  inputDir = path.join(__dirname, "upscaled_images");
} else if (fs.existsSync(path.join(__dirname, "frames-png"))) {
  inputDir = path.join(__dirname, "frames-png");
}

const outputDir = path.join(__dirname, "frames-webp");
const publicOutputDir = __dirname;

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(publicOutputDir)) fs.mkdirSync(publicOutputDir, { recursive: true });

// Read and sort all PNG files numerically by frame number
let files = fs.readdirSync(inputDir).filter((file) => /\.png$/i.test(file));

files.sort((a, b) => {
  const numA = (a.match(/\d+/) || [0])[0];
  const numB = (b.match(/\d+/) || [0])[0];
  return parseInt(numA, 10) - parseInt(numB, 10);
});

console.log(`Found ${files.length} PNG file(s) in: ${inputDir}`);

// Save manifest for dynamic total frame count detection in canvas component
const manifest = {
  totalFrames: files.length,
  fileExtension: ".webp",
  updatedAt: new Date().toISOString(),
};
fs.writeFileSync(
  path.join(publicOutputDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

let completed = 0;
files.forEach((file, index) => {
  const inputFilePath = path.join(inputDir, file);
  
  // Format frame index as 3-digit padded number (ezgif-frame-001.webp, ezgif-frame-002.webp, ...)
  const frameIndex = String(index + 1).padStart(3, "0");
  const outputFileName = `ezgif-frame-${frameIndex}.webp`;

  const outputFilePath = path.join(outputDir, outputFileName);
  const publicFilePath = path.join(publicOutputDir, outputFileName);

  sharp(inputFilePath)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputFilePath)
    .then(() => {
      // Sync directly into public/scroll/chess for web app rendering
      fs.copyFileSync(outputFilePath, publicFilePath);
      completed++;
      console.log(`Converted (${completed}/${files.length}): ${file} -> ${outputFileName}`);
    })
    .catch((err) => {
      console.error(`Error converting ${file}:`, err);
    });
});
