---
title: Project Proposal for Pixals.net
company: Pixals.net
role: 3D Artist
date: 2026-08-05
---

Hi Nicholas,

I have over 9 years of experience creating visual content for high-end CG productions, immersive attractions, and custom cinemas. Your focus on building premium 4K collections immediately caught my eye, and I would love to collaborate directly with you on developing new visual concepts.

Much of my background comes from my time at Attraktion!, where I created visual content for special venue cinemas and dome theaters. Recently, I served as CG supervisor on NaturaVision for Loro Parque in Tenerife. We delivered an 18K film for Coral Kingdom that spanned a projected dome ceiling and an LED floor. I handled the pipeline spanning both projection systems, integrated water VFX, and delivered the final high-resolution image sequences: https://sydoryk.com/detail/NaturaVision

Looking at your landing page and collections, here is how I would approach several of your key concepts:

### Approaches to Hero Banner Concepts

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 1.5rem 0; padding: 1.25rem; border: 1px solid var(--color-700); border-radius: 8px; background: rgba(255,255,255,0.02);">
  <div class="video-embed" style="flex: 0 0 320px; max-width: 360px; width: 100%;">
    <img src="/assets/coverletter/pixals_fluid_dynamics.webp" alt="Interactive Fluid Dynamics" style="width: 100%; border-radius: 6px; display: block; border: 1px solid var(--color-700); aspect-ratio: 16/9; object-fit: cover;" />
  </div>
  <div style="flex: 1 1 300px;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Interactive Fluid Simulation</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--color-200); line-height: 1.6;">
      For interactive fluid simulations responding to viewers in real time, I would build this in Unreal Engine using the FluidNinja plugin, or as a lightweight WebGL shader setup for browser-based interactive displays.
    </p>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 1.5rem 0; padding: 1.25rem; border: 1px solid var(--color-700); border-radius: 8px; background: rgba(255,255,255,0.02);">
  <div class="video-embed" style="flex: 0 0 320px; max-width: 360px; width: 100%;">
    <img src="/assets/coverletter/pixals_moon_surface.webp" alt="Moon Surface Shadows" style="width: 100%; border-radius: 6px; display: block; border: 1px solid var(--color-700); aspect-ratio: 16/9; object-fit: cover;" />
  </div>
  <div style="flex: 1 1 300px;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Moon Shadows & Surface</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--color-200); line-height: 1.6;">
      I would create a procedural cratered terrain in Houdini, lit by a strong directional sun to cast sharp, dramatic grazing shadows across the lunar surface and craters.
    </p>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 1.5rem 0; padding: 1.25rem; border: 1px solid var(--color-700); border-radius: 8px; background: rgba(255,255,255,0.02);">
  <div class="video-embed" style="flex: 0 0 320px; max-width: 360px; width: 100%;">
    <img src="/assets/coverletter/pixals_earth_view.webp" alt="Planet Earth from Space" style="width: 100%; border-radius: 6px; display: block; border: 1px solid var(--color-700); aspect-ratio: 16/9; object-fit: cover;" />
  </div>
  <div style="flex: 1 1 300px;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Orbital View of Planet Earth</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--color-200); line-height: 1.6;">
      While I have previously created similar shots in Unreal, for highest 4K+ fidelity I use Houdini with realistic atmospheric Rayleigh and Mie scattering, paired with true volumetric cloud layers that cast accurate shadows directly onto the terrain and ocean specular highlights.
    </p>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 1.5rem 0; padding: 1.25rem; border: 1px solid var(--color-700); border-radius: 8px; background: rgba(255,255,255,0.02);">
  <div class="video-embed" style="flex: 0 0 320px; max-width: 360px; width: 100%;">
    <img src="/assets/coverletter/pixals_logo_morphing.webp" alt="Water Droplet Logo Morphing" style="width: 100%; border-radius: 6px; display: block; border: 1px solid var(--color-700); aspect-ratio: 16/9; object-fit: cover;" />
  </div>
  <div style="flex: 1 1 300px;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Water Droplet Logo Morphing</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--color-200); line-height: 1.6;">
      I would use a custom FLIP fluid simulation in Houdini and animate morphing bubbles that seamlessly merge and transform into the final 3D brand logo.
    </p>
  </div>
</div>

### Technical Breakdown for Pixals Abstract Visuals

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 1.5rem 0; padding: 1.25rem; border: 1px solid var(--color-700); border-radius: 8px; background: rgba(255,255,255,0.02);">
  <div class="video-embed" style="flex: 0 0 320px; max-width: 360px; width: 100%;">
    <video src="https://www.pixals.net/movs/art/Pixals_Visuals_3720.mp4" autoplay loop muted playsinline controls style="width: 100%; border-radius: 6px; display: block; border: 1px solid var(--color-700);"></video>
  </div>
  <div style="flex: 1 1 300px;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Morphing Metallic Geometry</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--color-200); line-height: 1.6;">
      To create this effect, I would use two meshes with slow morphing geometry driven by moving procedural noise textures, paired with metallic micro-surface materials and studio lighting.
    </p>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 1.5rem 0; padding: 1.25rem; border: 1px solid var(--color-700); border-radius: 8px; background: rgba(255,255,255,0.02);">
  <div class="video-embed" style="flex: 0 0 320px; max-width: 360px; width: 100%;">
    <video src="https://www.pixals.net/movs/art/Pixals_Visuals_312.mp4" autoplay loop muted playsinline controls style="width: 100%; border-radius: 6px; display: block; border: 1px solid var(--color-700);"></video>
  </div>
  <div style="flex: 1 1 300px;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Seamless Looping Motion</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--color-200); line-height: 1.6;">
      I would build a perfectly seamless loop animation with procedural controls that easily support any variation of materials, from leather and tactile fabrics to metals and glass.
    </p>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 1.5rem 0; padding: 1.25rem; border: 1px solid var(--color-700); border-radius: 8px; background: rgba(255,255,255,0.02);">
  <div class="video-embed" style="flex: 0 0 320px; max-width: 360px; width: 100%;">
    <video src="https://www.pixals.net/movs/art/Pixals_Visuals_3721.mp4" autoplay loop muted playsinline controls style="width: 100%; border-radius: 6px; display: block; border: 1px solid var(--color-700);"></video>
  </div>
  <div style="flex: 1 1 300px;">
    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Procedural Landscape & Growth</h4>
    <p style="margin: 0; font-size: 0.95rem; color: var(--color-200); line-height: 1.6;">
      This is straightforward using a procedural Houdini workflow. An animated procedural noise drives the ground height displacement, while rock placement dynamically controls the density and scale of vegetation around it, similar to my animation in <a href="https://sydoryk.com/detail/Conservatory/" target="_blank">Conservatory</a>.
    </p>
  </div>
</div>

### Custom 3D Showrooms & Configurator Workflows

Beyond rendered 4K loops, I can also build full custom 3D showrooms and interactive configurators so clients can explore products in real time with high-end visualization.

Best regards,  
Sydoryk Oleh  
3D Visualization / 3D Animation

<h3>Relevant Portfolio Examples</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
  <a href="/detail/NaturaVision" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/NaturaVision_cover.webp" alt="NaturaVision" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">NaturaVision</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Short movie for Loro Parque at Tenerife</p>
    </div>
  </a>
  <a href="/detail/Conservatory" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/conservatory_v006_540_square.webp" alt="Conservatory" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Conservatory</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Procedural organic environment & ad animation</p>
    </div>
  </a>
  <a href="/assets/gallery/creative/molecule_v001.webp" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/gallery/creative/molecule_v001.webp" alt="Glass Molecular Structure" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Glass Molecular Structure</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Procedural glass shader and studio lookdev</p>
    </div>
  </a>
  <a href="/assets/gallery/creative/TrigAI_IdeaA_v009_whiteTheme_noLines_moreRandom.webp" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/gallery/creative/TrigAI_IdeaA_v009_whiteTheme_noLines_moreRandom.webp" alt="Abstract Geometric Structure" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Abstract Geometric Structure</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Procedural voxel composition and directional lighting</p>
    </div>
  </a>
  <a href="/detail/SunnyBunny" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/SunnyBunny.webp" alt="The Magical Slide" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">The Magical Slide</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Short movie for Cinesplash 5D theater at Sonnentherme</p>
    </div>
  </a>
  <a href="/detail/Showreel" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
    <img src="/assets/cover/ShowReel_2024_540p_web.webp" alt="Showreel" style="width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">Showreel</h4>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">Movies Showreel</p>
    </div>
  </a>
</div>
