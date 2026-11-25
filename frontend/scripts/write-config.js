const fs = require('fs');
const path = require('path');

const configured = process.env.API_URL || process.env.API_BASE_URL || 'http://localhost:8080';
const normalized = configured.replace(/\/+$/, '');
const apiUrl = normalized.startsWith('http://') || normalized.startsWith('https://')
  ? normalized
  : `https://${normalized}`;

const target = path.join(__dirname, '..', 'src', 'config.js');
fs.writeFileSync(target, `window.__API_URL__ = ${JSON.stringify(apiUrl)};\n`, 'utf8');
console.log(`API URL: ${apiUrl}`);
