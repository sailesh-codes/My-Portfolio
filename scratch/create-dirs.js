const fs = require('fs');
const path = require('path');

// Ensure assets and fonts directories exist
const dirs = ['assets', 'fonts', 'public/assets', 'public/fonts'];
dirs.forEach(d => {
  const p = path.resolve(__dirname, d);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
});

console.log('Directories created successfully');
