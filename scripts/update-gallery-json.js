// scripts/update-gallery-json.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/assets/gallery');
const JSON_FILE_PATH = path.join(__dirname, '../src/data/gallery.json');

// Helper to format title from filename
function formatTitle(filename) {
  const base = path.basename(filename, path.extname(filename));
  // Replace dashes/underscores with spaces
  let title = base.replace(/[-_]+/g, ' ');
  // Remove technical suffixes like 4k, v001, static, etc.
  title = title.replace(/\b(v\d+|\d+k|static|preview|angle\d+|floating|main|still|closeup\d*)\b/gi, '');
  // Clean up double spaces
  title = title.replace(/\s+/g, ' ').trim();
  // Capitalize words
  return title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Helper to determine filters based on path
function getFiltersAndMeta(relativeWebPath) {
  const normalized = relativeWebPath.replace(/\\/g, '/');
  const parts = normalized.split('/');
  
  let projectType = 'tech product';
  let media = 'still image';
  let style = 'realistic';
  
  if (parts.includes('jewelry')) {
    projectType = 'jewelry';
  } else if (parts.includes('industrial')) {
    projectType = 'industrial';
  } else if (parts.includes('furniture')) {
    projectType = 'furniture';
  } else if (parts.includes('packaging')) {
    projectType = 'tech product';
  } else if (parts.includes('creative')) {
    projectType = 'tech product';
    style = 'artsy';
  }
  
  // Custom tweaks for specific root files
  const filename = parts[parts.length - 1];
  if (filename.includes('Jacket') || filename.includes('Balaclava') || filename.includes('Hat')) {
    style = 'artsy';
  }

  return {
    projectType,
    media,
    style
  };
}

function walkWebp(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip icons and cropped subdirectories
      if (file !== 'icons' && file !== 'cropped') {
        walkWebp(filePath, fileList);
      }
    } else if (filePath.endsWith('.webp')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function main() {
  console.log('Updating gallery.json...');
  
  // 1. Read existing gallery items
  let existingItems = [];
  if (fs.existsSync(JSON_FILE_PATH)) {
    existingItems = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
  }
  
  // Create a map of normalized URLs to match existing items
  // Normalize png/jpg to webp for mapping because we converted them
  const itemMap = new Map();
  existingItems.forEach(item => {
    const webpUrl = item.url.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    itemMap.set(webpUrl, item);
  });

  // 2. Scan all WebP images in public/assets/gallery
  const webpFiles = walkWebp(GALLERY_DIR);
  const updatedItems = [];
  
  // To assign new IDs
  let maxId = existingItems.reduce((max, item) => {
    const idNum = parseInt(item.id, 10);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  webpFiles.forEach(file => {
    // Get relative path from public folder
    const relativeToPublic = path.relative(path.join(__dirname, '../public'), file);
    // Convert backslashes to forward slashes for web URL
    const urlPath = '/' + relativeToPublic.replace(/\\/g, '/');
    
    // Check if item already exists (matching by WebP path)
    if (itemMap.has(urlPath)) {
      const existingItem = itemMap.get(urlPath);
      // Update its URL to .webp just in case it was still .png or .jpg
      existingItem.url = urlPath;
      existingItem.type = 'image'; // Converted files are images
      updatedItems.push(existingItem);
    } else {
      // Create new entry
      maxId++;
      const filters = getFiltersAndMeta(urlPath);
      const title = formatTitle(path.basename(file));
      
      const newItem = {
        id: String(maxId),
        title: title,
        url: urlPath,
        type: 'image',
        projectLink: '',
        filters: filters,
        altText: title + ' render'
      };
      
      console.log(`+ Added new image: ${title} (${urlPath})`);
      updatedItems.push(newItem);
    }
  });

  // Add back any entries that are videos (which weren't converted to WebP)
  // or items pointing outside the gallery folder that are still valid
  existingItems.forEach(item => {
    if (item.type === 'video' || !item.url.startsWith('/assets/gallery/')) {
      // Make sure we don't add duplicates
      if (!updatedItems.some(ui => ui.id === item.id || ui.url === item.url)) {
        updatedItems.push(item);
      }
    }
  });

  // Sort items by ID so they are in a nice order
  updatedItems.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

  // 3. Write back to gallery.json
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(updatedItems, null, 2), 'utf8');
  console.log(`Gallery database updated successfully! Total entries: ${updatedItems.length}`);
}

main();
