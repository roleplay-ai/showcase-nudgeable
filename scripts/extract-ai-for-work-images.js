const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public', 'ai-for-work');
const IMG_DIR = path.join(ROOT, 'assets', 'images');

fs.mkdirSync(IMG_DIR, { recursive: true });

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

const DATA_URI_RE = /data:image\/(jpeg|png|webp|gif);base64,([A-Za-z0-9+/=]+)/g;

let totalBefore = 0;
let totalAfter = 0;
let totalImages = 0;

for (const file of files) {
  const filePath = path.join(ROOT, file);
  const before = fs.statSync(filePath).size;
  totalBefore += before;

  let content = fs.readFileSync(filePath, 'utf8');
  const slug = file.replace(/\.html$/, '');
  let idx = 0;

  content = content.replace(DATA_URI_RE, (match, ext, b64) => {
    idx += 1;
    totalImages += 1;
    const buf = Buffer.from(b64, 'base64');
    const filename = `${slug}-${String(idx).padStart(2, '0')}.${ext === 'jpeg' ? 'jpg' : ext}`;
    fs.writeFileSync(path.join(IMG_DIR, filename), buf);
    return `assets/images/${filename}`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  const after = fs.statSync(filePath).size;
  totalAfter += after;
  console.log(`${file}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(1)}KB (${idx} images extracted)`);
}

console.log('---');
console.log(`Total images extracted: ${totalImages}`);
console.log(`Total HTML size: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
