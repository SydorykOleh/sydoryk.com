import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, '..');
const sourceDir = path.join(basePath, 'tmp', 'fabric_textures');
const targetDir = path.join(basePath, 'public', 'assets', 'configurator');

const texturesDir = path.join(targetDir, 'textures');
const modelsDir = path.join(targetDir, 'models');
const rendersDir = path.join(targetDir, 'renders');

function ensureDirSync(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Clean and prepare directories
ensureDirSync(texturesDir);
ensureDirSync(modelsDir);
ensureDirSync(rendersDir);

const manifest = {
    collections: [],
    textures: []
};

const collectionsSet = new Set();

fs.createReadStream(path.join(sourceDir, 'Overview Fabrics.csv'))
    .pipe(csv())
    .on('data', (row) => {
        // "IMAGE AVAILABLE" is YES
        if (row['IMAGE AVAILABLE'] && row['IMAGE AVAILABLE'].trim().toUpperCase() === 'YES') {
            const code = row['CODE']?.trim();
            if (!code) return;

            const collectionName = row['COLLECTION']?.trim() || 'Unknown';
            const textureName = row['SUPPLIER COLOR NAME']?.trim() || code;

            const sourceTexture2k = path.join(sourceDir, 'texture_webp', `${code}_2k`);
            
            // Check if texture directory exists
            if (fs.existsSync(sourceTexture2k)) {
                collectionsSet.add(collectionName);
                
                // Copy textures
                const destTextureDir = path.join(texturesDir, `${code}_2k`);
                ensureDirSync(destTextureDir);
                
                const maps = ['color.webp', 'roughness.webp', 'normal.webp', 'ao.webp'];
                let hasMaps = true;
                for (const map of maps) {
                    const srcMap = path.join(sourceTexture2k, map);
                    const dstMap = path.join(destTextureDir, map);
                    if (fs.existsSync(srcMap)) {
                        fs.copyFileSync(srcMap, dstMap);
                    } else {
                        hasMaps = false;
                        console.warn(`Missing map ${map} for ${code}`);
                    }
                }

                // Check renders
                const renders = [];
                for (let i = 1; i <= 3; i++) {
                    const renderFile = `${code}_angle${i}.jpeg`;
                    const srcRender = path.join(sourceDir, 'render_preview', renderFile);
                    if (fs.existsSync(srcRender)) {
                        const dstRender = path.join(rendersDir, renderFile);
                        fs.copyFileSync(srcRender, dstRender);
                        renders.push(renderFile);
                    }
                }

                manifest.textures.push({
                    id: code,
                    name: textureName,
                    collection: collectionName,
                    mapsReady: hasMaps,
                    renders: renders
                });
            }
        }
    })
    .on('end', () => {
        manifest.collections = Array.from(collectionsSet).sort();
        
        // Write manifest
        fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
        
        // Copy Models
        const sourceModelsDir = path.join(sourceDir, '3d_models');
        if (fs.existsSync(sourceModelsDir)) {
            const models = fs.readdirSync(sourceModelsDir).filter(file => file.endsWith('.glb'));
            for (const model of models) {
                fs.copyFileSync(path.join(sourceModelsDir, model), path.join(modelsDir, model));
            }
        }

        console.log('Processed Textures:', manifest.textures.length);
        console.log('Collections:', manifest.collections.length);
        console.log('Assets copied to public/assets/configurator/');
    });
