import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create CJS wrapper
const cjsContent = `module.exports = require('./index.js');`;
fs.writeFileSync(path.join(distDir, 'index.cjs'), cjsContent);

console.log('Created CJS wrapper');
