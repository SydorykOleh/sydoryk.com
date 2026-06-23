# Texture Import Process

This document outlines the workflow for importing a new batch of rendered fabrics into the configurator.

## Prerequisites
New fabric assets should be exported into a batch folder (e.g., `batch04`) containing:
1. `texture_webp/`: Contains subdirectories for each fabric code (e.g., `BAB-05_2k/`) containing `color.webp`, `roughness.webp`, `normal.webp`, `ao.webp`.
2. `render_preview/`: Contains the JPEG renders for the previews (e.g., `BAB-05_angle1.jpeg`).

## Import Workflow

### 1. Update Working Directory
The configurator builds its manifest from `tmp/fabric_textures/`. You must move your new assets into this directory:
- Copy the contents of your batch `texture_webp/` folder into `tmp/fabric_textures/texture_webp/`.
- Copy the contents of your batch `render_preview/` folder into `tmp/fabric_textures/render_preview/`.

### 2. Update the CSV
The `tmp/fabric_textures/Overview Fabrics.csv` file controls which fabrics are built into the configurator.
- For existing fabric codes that just received renders, you must change the `IMAGE AVAILABLE` column (the very last column) to `YES`.
- For completely new fabrics, add a new row to the CSV. Make sure `COLLECTION`, `SUPPLIER COLOR NAME`, and `CODE` match the folder naming scheme exactly, and set `IMAGE AVAILABLE` to `YES`.

*Note: You can automate this process using a custom node script, similar to the one written during batch04 import (which parsed the directory and automatically appended/updated the CSV).*

### 3. Run the Processing Script
Once the CSV is updated and all source files are in `tmp/fabric_textures/`, run the following command from the root of the project:
```bash
node scripts/process-textures.js
```

This script will:
- Read `Overview Fabrics.csv`
- Identify all fabrics with `IMAGE AVAILABLE = YES`
- Copy the maps and renders for those fabrics to `public/assets/configurator/`
- Generate `manifest.json` with the updated collections and textures

### 4. Verification
- Start the dev server (`yarn dev`).
- Open the 3D Configurator and verify the new textures appear in the UI and load correctly on the 3D model.
