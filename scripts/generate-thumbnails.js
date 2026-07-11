import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.join(__dirname, '../public/assets/configurator/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const texturesDir = path.join(__dirname, '../public/assets/configurator/textures');
const thumbnailsDir = path.join(__dirname, '../public/assets/configurator/thumbnails');

if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
}

async function generateThumbnails() {
    for (const tex of manifest.textures) {
        const thumbPath = path.join(thumbnailsDir, `${tex.id}.webp`);
        
        let sourcePath = path.join(texturesDir, `${tex.id}_4k`, 'color.webp');
        if (!fs.existsSync(sourcePath)) {
            sourcePath = path.join(texturesDir, `${tex.id}_2k`, 'color.webp');
        }
        
        if (fs.existsSync(sourcePath)) {
            console.log(`Generating thumbnail for ${tex.id}...`);
            const image = sharp(sourcePath);
            const metadata = await image.metadata();
            
            // Zoom in by extracting the center 25% of the image
            const size = Math.min(metadata.width, metadata.height);
            const cropSize = Math.floor(size / 4); 
            const left = Math.floor((metadata.width - cropSize) / 2);
            const top = Math.floor((metadata.height - cropSize) / 2);

            await image
                .extract({ left, top, width: cropSize, height: cropSize })
                .resize(256, 256)
                .webp({ quality: 80 })
                .toFile(thumbPath);
        } else {
            console.warn(`Source image for ${tex.id} not found.`);
        }
    }
    console.log('Thumbnail generation complete.');
}

generateThumbnails().catch(console.error);
