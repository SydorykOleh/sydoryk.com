import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.join(__dirname, '../public/assets/configurator/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const newTextures = [
    'BT-01', 'BT-02', 'BT-03',
    'KIM-01', 'KIM-02', 'KIM-03', 'KIM-04',
    'LAV-01', 'LAV-02', 'LAV-03',
    'LEO-01', 'LEO-02', 'LEO-03', 'LEO-04',
    'MOD-01',
    'SOH-02', 'SOH-03',
    'TRE-06',
    'ZKG-01', 'ZKG-02', 'ZKG-03'
];

const newCollections = new Set();
newTextures.forEach(id => {
    const col = id.split('-')[0];
    newCollections.add(col);
});

// Update collections
newCollections.forEach(col => {
    if (!manifest.collections.includes(col)) {
        manifest.collections.push(col);
    }
});
manifest.collections.sort();

// Update textures
newTextures.forEach(id => {
    const col = id.split('-')[0];
    const exists = manifest.textures.some(t => t.id === id);
    if (!exists) {
        manifest.textures.push({
            id: id,
            name: id,
            collection: col,
            mapsReady: true,
            renders: [],
            batch: "Batch05"
        });
    }
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));
console.log('Manifest updated successfully.');
