# Portfolio Assets & Media Guidelines

This document outlines the organization, directory structure, and best practices for managing portfolio visual assets across the portfolio website, proposal pages, and cover letters.

---

## 1. Directory Structure

All public media assets are served directly from the `public/assets/` folder:

```text
public/assets/
├── cover/                      # Main homepage & project card covers (e.g. EarPlugs_540p.webp, HotSause.webp)
├── gallery/                    # General gallery & lookdev catalog pieces
│   ├── packaging/              # Gift sets, cosmetic boxes, pouches, tubes, droppers, packaging renders
│   ├── furniture/              # Sofas, chairs, architectural furniture assets (4K renders)
│   ├── industrial/             # Machinery, assemblies, conveyors, schematic & technical assets
│   ├── jewelry/                # High-end jewelry, rings, necklaces, metallic & gemstone lookdev
│   ├── creative/               # Abstract & experimental visuals
│   ├── icons/                  # 3D isometric icons (apartment, house, property)
│   ├── cropped/                # Cropped 4K industrial assembly highlights
│   └── video/                  # Product & mechanism animation clips (.mp4)
├── projects/                   # Dedicated project folders with full-resolution detail assets
│   ├── Apparel/
│   ├── Conservatory/
│   ├── EarPlugs/
│   ├── HotSause/
│   ├── Microphone/
│   └── ...
├── configurator/               # 3D assets, glb models, textures for interactive viewers
├── upwork/                     # Specific video attachments & tailored assets for proposals
└── coverletter/                # Generated PDFs and cover letter attachment media
```

---

## 2. General Packaging & Gift Set Assets

General packaging and gift set renders are stored in:
📁 `public/assets/gallery/packaging/`

Key assets include:
- `Shot01-TheFullKit_v007.webp` - Full multi-product gift set and rigid box presentation
- `hotsause_presentbox_v001.webp` - Custom gift presentation box with internal foam insert
- `AudioFeel_still_normal_black_1-1_v006.webp` - Matte black finish and product packaging
- `Box-Cross_floating_main_Gold.webp` - Luxury rigid gift box with metallic gold foil
- `BlankStandUpPouchMylarBag_3x4_corner-round_palette-dark_finish-matte.webp` - Matte finish pouch lookdev

---

## 3. Proposal & Cover Letter Layout Rules

### A. Standalone Reference Images (Visual Examples)
When adding visual reference examples (e.g. packaging styles, finish variations) that shouldn't be formatted as interactive cards:
- Render them as clean, standalone images (`300px` width, rounded corners) inside a flex wrap container without card borders, titles, or descriptions:
  ```html
  <h3>Packaging & Finish Visual References</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; margin-bottom: 2rem;">
    <a href="/assets/gallery/packaging/[ASSET_NAME].webp" target="_blank">
      <img src="/assets/gallery/packaging/[ASSET_NAME].webp" alt="[DESCRIPTION]" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
    </a>
  </div>
  ```

### B. Interactive Case Study Cards (Portfolio Section)
For primary portfolio items that link to full case study detail pages:
- **Grid Sizing:** Use a responsive CSS grid with a minmax column layout:
  ```html
  <h3>Relevant Portfolio Examples</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
    <a href="[DETAIL_PATH]" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
      <img src="[COVER_PATH]" alt="[TITLE]" style="width: 100%; height: 180px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
      <div style="padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">[TITLE]</h4>
        <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">[DESC]</p>
      </div>
    </a>
  </div>
  ```
- **Media Formats:** Always prioritize `.webp` (still or animated) for optimal web load speed. For animated covers, link the animated `.webp` or `.mp4` variant directly.
- **Data References:** Check `src/data/home.json` for major case studies and `src/data/gallery.json` for specialized gallery items.
