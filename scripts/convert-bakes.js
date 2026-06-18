import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const houdiniBakeDir = "G:/projects/01_FREELANCE/2026-04-FluxBe/01_scene/houdini/render/light_bake/chair";
const publicAssetsDir = path.join(__dirname, '../public/assets/configurator/textures/bakes');

if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
}

async function convertBakes() {
    console.log("Converting Houdini bakes to WEBP...");
    const files = fs.readdirSync(houdiniBakeDir).filter(f => f.endsWith('.png'));

    for (const file of files) {
        const srcPath = path.join(houdiniBakeDir, file);
        const destName = file.replace('.png', '.webp');
        const destPath = path.join(publicAssetsDir, destName);

        try {
            await sharp(srcPath)
                .webp({ quality: 85 })
                .toFile(destPath);
            console.log(`Converted: ${destName}`);
        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
        }
    }
    console.log("Conversion complete!");
}

convertBakes();
