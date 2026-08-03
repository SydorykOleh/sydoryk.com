import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'G:/projects/01_FREELANCE/01_PORTFOLIO/examples';
const outputDir = 'G:/projects/01_FREELANCE/01_PORTFOLIO/examples_jpeg';

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.tif', '.tiff', '.bmp', '.tga']);

async function getFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function processImages() {
  console.log(`Scanning: ${inputDir}`);
  const allFiles = await getFiles(inputDir);
  const imageFiles = allFiles.filter(f => imageExtensions.has(path.extname(f).toLowerCase()));

  console.log(`Found ${imageFiles.length} images to optimize.`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let successCount = 0;
  let failCount = 0;

  for (const filePath of imageFiles) {
    const relativePath = path.relative(inputDir, filePath);
    const parsed = path.parse(relativePath);
    const targetDir = path.join(outputDir, parsed.dir);
    const targetFile = path.join(targetDir, `${parsed.name}.jpg`);

    await fs.promises.mkdir(targetDir, { recursive: true });

    try {
      const origStat = await fs.promises.stat(filePath);
      totalOriginalSize += origStat.size;

      await sharp(filePath)
        .rotate() // auto-rotate based on EXIF if present
        .flatten({ background: '#ffffff' }) // white background for transparent pngs
        .jpeg({ quality: 85, mozjpeg: true, progressive: true })
        .toFile(targetFile);

      const newStat = await fs.promises.stat(targetFile);
      totalOptimizedSize += newStat.size;
      const savings = ((1 - newStat.size / origStat.size) * 100).toFixed(1);

      console.log(`✓ ${relativePath} -> ${path.relative(outputDir, targetFile)} [${formatBytes(origStat.size)} -> ${formatBytes(newStat.size)} (-${savings}%)]`);
      successCount++;
    } catch (err) {
      console.error(`✗ Failed to process ${relativePath}:`, err.message);
      failCount++;
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Processed: ${successCount} successful, ${failCount} failed`);
  console.log(`Original total size: ${formatBytes(totalOriginalSize)}`);
  console.log(`Optimized total size: ${formatBytes(totalOptimizedSize)}`);
  const totalSavings = totalOriginalSize > 0 ? ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1) : 0;
  console.log(`Total space saved: ${formatBytes(totalOriginalSize - totalOptimizedSize)} (${totalSavings}%)`);
}

processImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
