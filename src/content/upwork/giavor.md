---
title: Project Proposal for Giavor Fine Jewelry
company: Giavor
role: 3D Jewelry Rendering Artist & Visualization Specialist
date: 2026-08-03
---

I have direct experience creating high-end, editorial-grade jewelry visualizations from native Rhino (.3dm) CAD files. For Giavor's 18K gold and diamond collections, I will establish physically accurate gemstone dispersion, realistic precious metal reflections, and clean studio lighting comparable to Graff, Cartier, and Harry Winston, delivering crisp transparent/white background e-commerce stills, interactive 3D drag-to-rotate viewers, and AI model lifestyle placements.

### Proposed Workflow

- **CAD Ingestion & Mesh Optimization**: Import your Rhino/MatrixGold `.3dm` files directly. Perform high-density NURBS tessellation to preserve exact curvature without faceted artifacts on bezels, prongs, or band profiles.
- **Physical Shader & Look Development**:
  - **18K Gold (Yellow, White, Rose)**: Calibrated IOR and complex fresnel response with subtle micro-surface roughness for authentic luxury sheen rather than CGI gloss.
  - **Diamonds & Gemstones**: Spectral raytracing with optical dispersion (Abbe value calculations) and internal facet reflections to produce natural fire, brilliance, and scintillation without blown-out highlights.
- **Studio Lighting & Composition**: Set up specialized jewelry softbox strips and pin-point kickers that accentuate metal silhouettes and stone facets against pure white (#FFFFFF) and transparent alpha backgrounds.
- **3D Drag & 360° Viewing Options**: We can deliver this in two ways depending on your website performance and aesthetic preferences:
  - **Real-Time 3D WebGL Configurator**: Interactive real-time 3D engine in the browser allowing full orbit, zoom, and dynamic finish changes (see live real-time demo: [3D Fabric Configurator](/fabric-configurator/)).
  - **2D Prerendered 360° Turntable**: Multi-angle raytraced image sequences for maximum photorealistic luxury reflections with smooth drag-to-rotate interaction (see live examples: [Microphone 360 Viewer](/detail/MicConfigurator), [Headphones 360 Viewer](/detail/Headphones)).
- **AI Model Lifestyle Compositing**: Seamlessly integrate the rendered jewelry onto realistic AI-generated hand, wrist, and neck models, ensuring matching focal depth, skin tone interaction, and accurate contact shadows.
- **Consistency & Batch Pipeline**: Maintain unified lighting rigs and shader libraries so every piece across the Giavor collection has an identical luxury aesthetic.

### Application Questions & Specifications

- **Software Used**: Houdini (Solaris/Karma) - 3D rendering, Three.js / WebGL - interactive 3D viewers, and ComfyUI / Photoshop (AI model lifestyle compositing).
- **Estimated Price Structure**:
  - **E-Commerce Still Package (per product)**: **$75 - $95** (Includes 3-4 high-resolution angles on pure white / transparent backgrounds).
  - **Interactive 3D Drag / 360 Spin**: **$120 - $150** per product (interactive WebGL viewer or 36-frame seamless rotation).
  - **AI Model Lifestyle Composite**: **$60 - $80** per high-end lifestyle image.
  - *Volume discounts available for ongoing collection launches and regular catalog additions.*
- **Estimated Turnaround Time**:
  - Initial shader calibration & first piece approval: **1-2 business days**.
  - Full product batch (5-10 pieces): **4-6 business days**.
  - Ongoing single additions: **24-48 hours**.
- **Revisions & Commercial Rights**: 2 rounds of refinement per piece to adjust camera framing, diamond sparkle, and metal warmth. Full commercial rights and high-resolution source deliverables included.

I am ready to start on your initial 3DM file right away to establish the baseline aesthetic for the collection.

Best regards,  
Sydoryk Oleh  
3D Visualization / 3D Animation

<h3>Jewelry Lookdev & Material References</h3>
<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem; margin-bottom: 2rem;">
  <a href="/assets/gallery/jewelry/Malgari_front_diamond.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Malgari_front_diamond.webp" alt="18K Gold Solitaire Diamond Ring" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Malgari_front-tilt_375_diamond.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Malgari_front-tilt_375_diamond.webp" alt="Diamond Ring Angle View" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Malgari_side-tilt_375_emerald.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Malgari_side-tilt_375_emerald.webp" alt="Emerald & Gold Ring" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Bracelet-Sanctum_floating_main_Gold.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Bracelet-Sanctum_floating_main_Gold.webp" alt="18K Gold Luxury Bracelet" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Ring-Moon_floating_main_no-blur_Gold.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Ring-Moon_floating_main_no-blur_Gold.webp" alt="18K Gold Band" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
  <a href="/assets/gallery/jewelry/Necklace-CrossRotated_floating_angle_no-blur_Gold.webp" target="_blank">
    <img src="/assets/gallery/jewelry/Necklace-CrossRotated_floating_angle_no-blur_Gold.webp" alt="Fine Gold Necklace" style="width: 300px; height: auto; border-radius: 8px; display: block;" />
  </a>
</div>

<h3>Relevant Portfolio Examples</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
  <a href="/detail/jewelryConfigurator" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/jewelry_animated.webp" alt="Interactive Jewelry Configurator" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Interactive Jewelry Configurator</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Real-time 2D configurator to preview rings variants.</p>
    </div>
  </a>
  <a href="/fabric-configurator" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/configurator/renders/CAN-04_angle1.jpeg" alt="Real-Time 3D Fabric Configurator" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Real-Time 3D Fabric Configurator</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Real-time Three.js / WebGL 3D configurator with custom PBR shaders and dynamic lighting.</p>
    </div>
  </a>
  <a href="/detail/EarPlugs" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/EarPlugs_540p.webp" alt="EarPlugs 360 Viewer & Animation" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">EarPlugs Packaging</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Lookdev presentation.</p>
    </div>
  </a>
  <a href="/detail/Headphones" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/headphoneConfig.webp" alt="Headphones 360 Viewer" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Headphones 360° Viewer</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">2D prerendered 360° drag-to-rotate sequence with seamless material switching.</p>
    </div>
  </a>
  <a href="/detail/MicConfigurator" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/micConfig.jpg" alt="Microphone 360 Viewer" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Microphone 360° Viewer</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">2D prerendered 360° interactive turntable viewer with part inspection.</p>
    </div>
  </a>
</div>
