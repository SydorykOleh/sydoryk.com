// scripts/convert-to-webp.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/assets/gallery');
const QUALITY = 85;

// Recursive function to walk directories and convert images
async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const relativePath = path.relative(GALLERY_DIR, fullPath);
        const webpPath = fullPath.substring(0, fullPath.length - ext.length) + '.webp';
        
        try {
          console.log(`Converting: ${relativePath} -> ${path.relative(GALLERY_DIR, webpPath)}`);
          
          await sharp(fullPath)
            .webp({ quality: QUALITY })
            .toFile(webpPath);
            
          // Delete the original file to save space and clean up
          fs.unlinkSync(fullPath);
          console.log(`✓ Converted and removed original: ${relativePath}`);
        } catch (error) {
          console.error(`✗ Error converting ${relativePath}:`, error);
        }
      }
    }
  }
}

async function main() {
  console.log(`Starting WebP conversion (Quality: ${QUALITY}%) in ${GALLERY_DIR}...`);
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error(`Gallery directory not found at: ${GALLERY_DIR}`);
    process.exit(1);
  }
  
  await processDirectory(GALLERY_DIR);
  console.log('WebP conversion completed successfully!');
}

main().catch(console.error);
