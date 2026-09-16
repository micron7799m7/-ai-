import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c;
  }
  return table;
}

const crcTable = createCrcTable();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createPngChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4);
  data.copy(chunk, 8);
  
  const crcPart = Buffer.concat([Buffer.from(type), data]);
  const crc = crc32(crcPart);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function generateSolidBrandedPng(size, primaryR = 220, primaryG = 38, primaryB = 38) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0); // width
  ihdrData.writeUInt32BE(size, 4); // height
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // compression method
  ihdrData[11] = 0; // filter method
  ihdrData[12] = 0; // interlace method
  const ihdrChunk = createPngChunk('IHDR', ihdrData);

  // Raw image data with scanline filters
  // Size * (1 filter byte + size * 4 RGBA bytes)
  const rawBytes = Buffer.alloc(size * (1 + size * 4));
  let offset = 0;

  const center = size / 2;
  const radius = size * 0.42;

  for (let y = 0; y < size; y++) {
    rawBytes[offset++] = 0; // Filter: None
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Rounded squircle border math
      if (Math.abs(dx) > size * 0.46 || Math.abs(dy) > size * 0.46) {
        // Transparent corner
        rawBytes[offset++] = 0;
        rawBytes[offset++] = 0;
        rawBytes[offset++] = 0;
        rawBytes[offset++] = 0;
      } else if (dist < size * 0.2) {
        // Gold emblem in center
        rawBytes[offset++] = 254; // R
        rawBytes[offset++] = 240; // G
        rawBytes[offset++] = 138; // B
        rawBytes[offset++] = 255; // A
      } else {
        // Brand red gradient
        const t = y / size;
        rawBytes[offset++] = Math.round(primaryR - t * 40);
        rawBytes[offset++] = Math.round(primaryG - t * 20);
        rawBytes[offset++] = Math.round(primaryB - t * 20);
        rawBytes[offset++] = 255;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawBytes, { level: 9 });
  const idatChunk = createPngChunk('IDAT', compressedData);
  const iendChunk = createPngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 192x192
const png192 = generateSolidBrandedPng(192);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);

// 512x512
const png512 = generateSolidBrandedPng(512);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

// Apple Touch Icon (180x180)
const appleIcon = generateSolidBrandedPng(180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Favicon.ico (32x32)
const favIcon = generateSolidBrandedPng(32);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favIcon);

console.log('Successfully generated all compliant PWA and iOS PNG icons!');
