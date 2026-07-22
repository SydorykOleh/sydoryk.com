import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COVER_DIR = path.join(__dirname, '../public/assets/cover');
const SOURCE_DIR = path.join(COVER_DIR, 'source_mp4');

async function convertMp4ToWebp() {
    console.log(`Scanning directory for .mp4 files: ${SOURCE_DIR}`);
    
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`Directory not found: ${SOURCE_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(SOURCE_DIR);
    const mp4Files = files.filter(file => file.toLowerCase().endsWith('.mp4'));

    if (mp4Files.length === 0) {
        console.log('No .mp4 files found to convert.');
        return;
    }

    console.log(`Found ${mp4Files.length} .mp4 files. Starting conversion...`);

    for (const file of mp4Files) {
        const inputPath = path.join(SOURCE_DIR, file);
        const webpFilename = file.replace(/\.mp4$/i, '.webp');
        const outputPath = path.join(COVER_DIR, webpFilename);

        console.log(`Converting: ${file} -> ${webpFilename}...`);
        
        // FFMPEG command to convert to animated webp. 
        // -vf scale=-2:540: scale to 540px height, maintain aspect ratio, width divisible by 2
        // -vcodec libwebp: Use WebP codec
        // -lossless 0: Lossy compression (better size)
        // -q:v 50: Quality setting (0-100, 50 provides stronger compression)
        // -compression_level 6: Max compression effort
        // -loop 0: Infinite loop
        // -preset default: Default preset
        // -an: Remove audio (if any)
        const command = `ffmpeg -y -i "${inputPath}" -vf "scale=-2:540" -vcodec libwebp -lossless 0 -q:v 50 -compression_level 6 -loop 0 -preset default -an -vsync 0 "${outputPath}"`;

        try {
            await execPromise(command);
            console.log(`✓ Successfully created ${webpFilename}`);
            
            // Optionally, we could delete the original mp4 here, but it's safer to keep it 
            // until you verify the webp looks good.
            // fs.unlinkSync(inputPath);
        } catch (error) {
            console.error(`✗ Failed to convert ${file}:`, error.message);
        }
    }
    
    console.log('All conversions finished!');
}

convertMp4ToWebp().catch(console.error);
