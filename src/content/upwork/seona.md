---
title: Project Proposal for Seona Crystal Stud Earrings
company: Seona
role: 3D Jewelry Visualization Specialist
date: 2026-08-22
---

I have extensive experience turning engineering and jewelry CAD files into editorial-grade product photography for e-commerce.

By building a locked master studio rig in Houdini and Karma, I will establish physically calibrated crystal shaders (index of refraction, internal facet reflections, zero artificial bloom) and realistic precious metal, ensuring absolute visual consistency across all crystal colors, sizes, and metal finishes.

### Proposed Workflow

- **CAD Ingestion & Physical Scale Verification**: Import your existing CAD files directly without altering the underlying geometry. I verify true-to-scale millimeter dimensions, inspect prong seatings, posts, and backing mechanisms, and generate clean high-density tessellation to guarantee completely smooth metallic curves with zero faceting.
- **Physical Crystal & Metal Look Development**:
  - **Crystal Materials**: Calibrated refractive index (IOR) and dispersion calculations to create crisp, readable facet geometry and natural internal sparkle, avoiding plastic clarity, milky reflections, or excessive CGI bloom.
  - **Metal Finishes (Yellow Gold, Rose Gold, Silver/Rhodium)**: Custom PBR shading with realistic Fresnel response, controlled highlight rolloff, and subtle micro-surface roughness that mimics real photographed jewelry rather than mirror-like chrome.
- **Master Studio Scene & Dual-Background Rigging**: Build a locked studio environment with softbox light strips, custom white/black reflection cards to define edges, and ground shadow catchers tailored for both pure white (#FFFFFF) Amazon hero requirements and off-white (#F8F8F8) brand site aesthetics.
- **Standardized Shot Execution (Per SKU / Variant)**:
  1. **Main Hero Image**: Centered composition, tight contact shadow, filling 80–85% of the frame.
  2. **Angled View 1 (30–45°)**: Highlights setting depth, prong structure, post, and backing lock.
  3. **Angled View 2 (Front & Back)**: Clear dual-angle presentation showing stone face and rear mechanism.
  4. **On-Ear Placement (True-to-Size)**: Composited onto an anatomical ear model with accurate physical scale, realistic skin occlusion, and natural contact shadows.
  5. **360° Turntable Video**: High-frame-rate seamless looping product rotation with locked exposure and consistent lighting.
- **Collection-Wide Size Comparison**: Create a single universal comparison graphic showing all stud earring millimeter sizes side-by-side on-ear for clear customer size guidance.
- **Batch Variant Production & Asset Organization**: Establish a procedural variation pipeline to swap crystal color maps and metal shaders seamlessly across different sizes while preserving identical visual style.
- **File Management & Final Handover**: Maintain clean naming conventions, structured master scene files, and full version control, surrendering all source scene files, textures, and render settings upon project completion.

### Application Questions & Specifications

1. **Portfolio & Jewelry Examples**:
   - Live interactive 3D jewelry viewer and configurator: [Interactive Jewelry Configurator](/detail/jewelryConfigurator)
   - 360° product inspection and metal lookdev: [Microphone 360 Viewer](/detail/MicConfigurator), [Headphones 360 Viewer](/detail/Headphones)
   - Studio lighting and wearable packaging lookdev: [EarPlugs Case Study](/detail/EarPlugs)
   - Direct jewelry render references: see the gallery below for gold, silver, diamond, emerald, and sapphire lookdev.

2. **Rendering Workflow**:
   - **3D Software**: SideFX Houdini (Solaris / USD pipeline) / MoI3D (CAD meshing).
   - **Rendering Engine**: Karma CPU / XPU and Redshift (linear 32-bit/16-bit multi-pass EXR output).
   - **Post-Production**: Foundry Nuke for precision color balancing, contact shadow isolation, and e-commerce web optimization.
   - **Crystal Material Approach**: Modeled with physical spectral raytracing, accurate IOR, volumetric absorption for rich colored crystal cores, and internal reflection bounces to keep facets sharp without relying on artificial glow filters.
   - **Metal Reflection Approach**: Controlled through custom studio light cards, soft gradients, and calibrated roughness maps to reflect real photography flags and reflectors rather than HDRI clutter.

3. **Production Capacity & Turnaround**:
   - Deliverable per SKU: 3 product stills + 1 on-ear image + 1 x 360° rotation video (both on #FFFFFF and #F8F8F8 backgrounds).
   - **Initial Lookdev & Master Rig Setup**: 3-5 business days to lock down the master scene, lighting, and first sample SKU for your review.
   - **Production Turnaround**: Turnaround depends on product complexity and variant counts, typically delivering **3–15 completed SKU packages per week** once the master workflow is established.

4. **Availability**:
   - Readily available with 3+ hours of daily working overlap with US Eastern Time (ET) for real-time communication, daily check-ins, and rapid feedback implementation.

5. **Hardware Specifications**:
   - **CPU**: AMD Ryzen 7 5800X (8 Cores, 16 Threads, up to 4.7 GHz)
   - **GPU**: NVIDIA GeForce RTX 3090 (24 GB GDDR6X VRAM)
   - **RAM**: 64 GB DDR4 RAM
   - **Storage**: 1 TB Fast NVMe SSD Storage + 10 TB Network Storage

6. **Relevant Experience**:
   - **Product & Jewelry Rendering**: Specialized in high-end product visualization with direct lookdev experience in luxury metals (18k gold, rose gold, 925 silver) and faceted gemstones.
   - **Ecommerce & Amazon Imagery**: Deep understanding of Amazon requirements (pure white #FFFFFF hero, 85% frame fill, zero compression artifacts, crisp edge contrast) and brand e-commerce styling.
   - **High-Volume Variant Pipelines**: Experienced in procedural rendering systems that generate hundreds of consistent color, size, and material variations from single master rigs without visual drift.
   - **Direct CAD Workflow**: Proficient in importing native STEP, IGES, and Rhino `.3dm` files, resolving mesh topology, and preserving exact physical proportions.

I am ready to review your CAD files and render a sample stud earring to demonstrate the lighting and crystal material quality for Seona.

Best regards,  
Sydoryk Oleh  
3D Visualization / 3D Animation

<h3>Jewelry Lookdev & Material References</h3>
<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; margin-bottom: 2rem;">
  <a href="/assets/gallery/jewelry/Malgari_front_diamond.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Malgari_front_diamond.webp" alt="Solitaire Diamond & 18K Gold" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Malgari_front-tilt_375_diamond.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Malgari_front-tilt_375_diamond.webp" alt="Diamond Macro Facets & Gold Prongs" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Malgari_side-tilt_375_emerald.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Malgari_side-tilt_375_emerald.webp" alt="Emerald Gemstone Refraction & Setting" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Malgari_front-tilt_925_sapphire_oxidised.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Malgari_front-tilt_925_sapphire_oxidised.webp" alt="Sapphire Gemstone & Metal Finish" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Ring-Flip_floating_main_no-blur_Gold.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Ring-Flip_floating_main_no-blur_Gold.webp" alt="Gold Specular Rolloff & Controlled Reflections" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Ring-Dragon_floating_main_Silver.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Ring-Dragon_floating_main_Silver.webp" alt="Silver & Platinum Metal Response" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
</div>

<h3>Relevant Portfolio Examples</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
  <a href="/detail/jewelryConfigurator" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/jewelry_animated.webp" alt="Interactive Jewelry Configurator" style="width: 100%; height: 220px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Interactive Jewelry Configurator</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Real-time 2D jewelry configurator showcasing faceted gemstones and precious metal variations.</p>
    </div>
  </a>
  <a href="/detail/MicConfigurator" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/micConfig.jpg" alt="360° Turntable & Inspection" style="width: 100%; height: 220px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">360° Product Viewer & Turntable</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">High-definition interactive 360-degree rotation and studio reflection controls.</p>
    </div>
  </a>
  <a href="/detail/Headphones" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/headphoneConfig.webp" alt="Headphones 360 Viewer" style="width: 100%; height: 220px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Headphones 360° Spin</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Prerendered raytraced turntable sequence demonstrating smooth metallic reflections.</p>
    </div>
  </a>
  <a href="/detail/EarPlugs" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/EarPlugs_540p.webp" alt="EarPlugs Wearable Lookdev" style="width: 100%; height: 220px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">EarPlugs Wearable Lookdev</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Studio lighting setup, clean packaging, and anatomical scale presentation.</p>
    </div>
  </a>
</div>
