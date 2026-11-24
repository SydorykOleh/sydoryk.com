---
title: Project Proposal for Pallet Racks Product Catalog (1,080 Variations)
company: Upwork Client
role: 3D Procedural & Product Visualization Specialist
date: 2026-11-24
---

I build procedural 3D product pipelines for large e-commerce catalogs, and your 1,080-variation `Dominus 1500` pallet rack catalog is a direct match for my workflow. Instead of assembling hundreds of static scenes manually, I build modular steel parts from your engineering drawings in **SideFX Houdini** and drive all 1,080 configurations straight from your spreadsheet. Every SKU renders under one locked studio setup in **Karma** and runs through **Nuke** for clean **1500 x 1500 px** main product images.

I reviewed all four tabs of `Pallet_Racks_Dimensions_Combinations.xlsx` (`Pallet Racks`, `drawing`, `flooring`, and `width & length`) alongside your four reference renders (`modulo 3h_inicail.jpg`, `modilo inicail 4h pie emp.jpg`, `modulo 3h_ext.jpg`, and `portADA.jpg`).

---

### How the 1,080 Variations Are Built Procedurally

1. **Modular Parts Modeled from Your Drawings:**
   - **`UPRIGHT 70`:** 70 mm profile with accurate 50 mm vertical slot pitch (`L variable con pasos de 50 mm`) and brace bolt holes.
   - **`TB Beams`:** Box/step beams with 5-hook end-connector plates (`M = Long.Nominal - 5 mm`, `L = Long.Nominal + 2 mm`).
   - **`T20` Bracing & Hardware:** `T20H-1065 mm` horizontal braces, `T20 D-1229 mm` / `D2-1312 mm` diagonal braces, and bolted joints.
   - **`Embedded footplate 70`:** `150 x 100 x 4 mm` baseplate with 6 anchor holes and `115 mm` insert sleeve.
   - **Shelf Decking (`Without` / `Chipboard` / `Metal`):** `22 mm` chipboard panels (`184 x 109.5 cm` single panel at `185 cm` width; dual `134.5` and `179.5 cm` panels with center seam at `270` and `360 cm` widths) plus retaining U-clips, and `1.5 mm` galvanized metal shelf panels.

2. **Spreadsheet-Driven Assembly in Houdini:**
   Importing your 1,080-row matrix (`6 Types x 5 Heights x 3 Field widths x 4 Level counts x 3 Flooring options`) lets Houdini assemble every combination automatically:
   - **Configuration (`Type`):** `Starter Rack` (2 upright frames), `Add-on Rack` (1 upright frame with open beam connectors matching `modulo 3h_ext.jpg`), and `Set of 2` through `Set of 5` (sharing intermediate uprights across 3 to 6 frames).
   - **Height-Specific Bracing:** Places 2 horizontal braces and scales diagonal brace counts accurately across `200`, `250`, `300`, `350`, and `400 cm` uprights per your `width & length` sheet.
   - **Levels & Decking:** Positions 2 to 5 beam levels and switches `Without`, `Chipboard`, and `Metal` flooring accurately for `185`, `270`, and `360 cm` bays.

3. **Studio Lookdev, Scale-Aware Camera Framing & Nuke Post-Processing:**
   - **Consistent Studio Rig:** Calibrated galvanized steel, RAL orange powder coat, and chipboard textures under one locked white-studio lighting setup with soft ground contact shadows.
   - **Framing Across Extreme Widths (`185 cm` to `1,800 cm`):** A 1-bay rack is `185 cm` wide while a `Set of 5` at `360 cm/bay` spans `1,800 cm` (18 meters). The procedural camera rig holds a consistent perspective and angle while adjusting framing cleanly so wider sets remain sharp inside a `1500 x 1500 px` product thumbnail.
   - **Nuke Batch Compositing & File Naming:** Linear EXR outputs are processed in **Nuke** for uniform `#FFFFFF` backgrounds (plus optional transparent PNGs with isolated shadows) and clean color/exposure calibration. Because Column A (`Name`) omits `Flooring` and produces 360 duplicate names across 1,080 rows, exports will use unique identifiers (`SKU` / `Row ID` + `Flooring`) followed by visual contact-sheet QA across all 1,080 files.

### Live Procedural Switching in Houdini Solaris

Here is a quick look at how my Houdini Solaris + Karma pipeline switches product models, materials, cameras, and lighting variations procedurally in real time (used previously to render 7,000+ catalog variants):

<video controls autoplay loop muted playsinline style="width: 100%; max-width: 780px; border-radius: 8px; border: 1px solid var(--color-700); display: block; margin: 1.25rem 0 2rem;">
  <source src="/assets/projects/Sofas/houdini_Variations.mp4" type="video/mp4" />
</video>

---

### Milestone 1 Alignment (Quick Details to Lock at Kickoff)

While reviewing the attachments, I noted a few small visual choices we will confirm together on the initial proof batch before running all 1,080 renders:
- **Beam Profile (`TB beams`):** Confirm whether `Dominus 1500` uses the `60 x 40 mm` or `80 x 50 mm` beam section (or changes by bay width).
- **Footplate & Clip Finishes:** Confirm orange embedded footplates (`modilo inicail 4h pie emp.jpg` / `modulo 3h_ext.jpg` / Sheet 2) vs. galvanized (`modulo 3h_inicail.jpg`), plus black vs. galvanized chipboard clips.
- **Metal Decking Style & Bracing:** Confirm whether metal shelves should be modeled as the `15 x 110 cm` modular strips listed on Sheet 3 (`12`, `18`, and `24` pcs) or the wider flanged trays shown in the `Add-on` thumbnails, and verify the `* need to verify` note on `BRACING T20 D2-1312 mm` plus whether the `KIMER` connector stamp stays visible.
- **Empty vs. Loaded & Format:** Confirm all 1,080 store images should be clean empty racks (like `modulo 3h_inicail.jpg` and `modulo 3h_ext.jpg`, rather than pallet-loaded like `portADA.jpg`), framing preference for `Set of 4` / `Set of 5`, and final output format (`#FFFFFF` JPG / WebP / transparent PNG).

---

### Proposed Schedule & Milestones ($2,000 Fixed Price)

- **Milestone 1 ($400, Week 1):** Component modeling from your drawings (or raw CAD/STEP files if available), studio lighting/lookdev, and **5 to 6 proof renders** (`Starter`, `Add-on`, `Set of 5`, and `Without / Chipboard / Metal`) for sign-off.
- **Milestone 2 ($1,200, Weeks 2 to 3):** Full Houdini procedural assembly of all 1,080 configurations, framing pass across all widths and heights, and Karma batch rendering.
- **Milestone 3 ($400, Weeks 3 to 4):** Nuke post-processing, 1,080-image visual QA, final tweaks, and organized delivery.

In the current workbook, `Depth (cm)` is `110 cm` across all rows and `Edition` is `Dominus 1500`. If you expand to additional rack depths or editions later, the same procedural Houdini setup can generate them cleanly without rebuilding from scratch.

Best regards,  
Sydoryk Oleh  
3D Visualization / 3D Animation

---

### Industrial & Studio Render Examples

<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; margin-bottom: 2.5rem;">
  <a href="/assets/gallery/industrial/ToolChanger_B_front-right.jpg" target="_blank">
    <img src="/assets/gallery/industrial/ToolChanger_B_front-right.jpg" alt="Precision metal hardware studio render on white" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/industrial/010-SpiralConveyorElevator_v003_angle1_4k.webp" target="_blank">
    <img src="/assets/gallery/industrial/010-SpiralConveyorElevator_v003_angle1_4k.webp" alt="Multi-level industrial structural steel frame render" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/industrial/001-CustomHydraulicRollboxAssembly_v003_angle4_4k.webp" target="_blank">
    <img src="/assets/gallery/industrial/001-CustomHydraulicRollboxAssembly_v003_angle4_4k.webp" alt="Industrial machined steel assembly render" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/industrial/MEV2601-006_system_sideB.webp" target="_blank">
    <img src="/assets/gallery/industrial/MEV2601-006_system_sideB.webp" alt="Modular steel frame system studio visualization" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
</div>

### Relevant Portfolio Case Studies

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
  <a href="/detail/IndustrialEquipment" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/IndustrialEquipment.webp" alt="Industrial Equipment Visualization" style="width: 100%; height: 220px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Industrial Equipment (Complex Mechanical Renders)</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Precision engineering geometry, metallic finishes, and consistent studio lighting across industrial systems.</p>
    </div>
  </a>
  <a href="/detail/Sofas" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/Sofas.webp" alt="Sofa Collections Batch Configuration Renders" style="width: 100%; height: 220px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Sofa Collections (7,000+ Variations Pipeline)</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Automated Houdini Solaris batch rendering and camera framing pipeline producing 7,000+ uniform catalog variants.</p>
    </div>
  </a>
</div>
