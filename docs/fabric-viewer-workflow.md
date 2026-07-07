# Fabric Viewer Workflow

This document serves as an overview of the 3D Fabric Configurator architecture, its components, and current workflows. Future agents should read this file to understand the system state before making changes.

## Architecture

The Fabric Configurator uses Three.js to render 3D models and apply complex custom shaders. It is divided into several key classes in `src/components/fabric-viewer/`:

- **FabricScene.ts**: Manages the base Three.js scene, camera, renderer, and lighting setup.
- **FabricMaterials.ts**: Manages materials and custom shader injections via `onBeforeCompile`. It provides:
  - `fabricMaterial`: A standard `MeshPhysicalMaterial` for normal fabrics.
  - `velvetMaterial`: A custom `MeshPhysicalMaterial` that includes sheen and a custom BRDF approach for velvet lighting.
  - `neutralMaterial`: Used for non-fabric parts of the models.
- **FabricLoader.ts**: Handles loading of `.glb` and `.obj` files, baked lighting maps, and texture sets. It orchestrates swapping out material assignments and textures based on user selection.
- **FabricState.ts**: A central state store that holds the currently selected model, textures, scales, and various global parameters (e.g., sheen roughness, debug modes).
- **FabricUI.ts**: Binds the UI controls (sliders, buttons, selects) defined in `src/pages/fabric-configurator.astro` to the `FabricState` and triggers scene/material updates.

## Texture Workflows & Rules

### Texture Formats
All textures are stored in `public/assets/configurator/textures/` in `.webp` format. Each fabric ID (e.g., `ADO-102`) has a folder containing `color.webp`, `roughness.webp`, `normal.webp`, and `ao.webp`.

### Velvet vs Standard Fabric
- The viewer allows switching between "Fabric" and "Velvet" base materials using the UI.
- The **Velvet** material uses custom shaders to calculate a sheen reflection model over the standard normal map.

### Batch 04 Tiled Textures
Certain textures (mostly Batch 04: `ADO`, `BOS`, `DAR` collections) are provided pre-tiled (tiled 6x). 
- When the **Velvet** material is active AND one of these texture collections is selected, the global texture scale (`currentRepeat`) is **divided by 6**.
- This logic is handled in `FabricLoader.ts -> updateTextureRepeats()`.

### Normal Map Toggling
- Velvet textures can optionally provide a `normal_raw.webp` map in addition to `normal.webp`.
- The UI contains a "Normal Map" toggle (Combined vs Raw) under the Velvet settings.
- **Combined** (`normal.webp`): The standard combined normal map.
- **Raw** (`normal_raw.webp`): A clean normal map without fabric structural noise, primarily used to isolate base geometry.
- `FabricLoader.ts` attempts to load both maps and stores them in the material's `userData`. The `applyVelvetNormalMode()` method swaps them based on the active UI setting.

## Making Changes
When adding new textures or modifying shader logic:
- Update `manifest.json` if adding new texture IDs or collections.
- Be careful with `onBeforeCompile` in `FabricMaterials.ts`. Any changes to Three.js shader chunks require updating the exact string replacements.
- Use `updateTextureRepeats()` in `FabricLoader.ts` to manage any dynamic texture scaling.
