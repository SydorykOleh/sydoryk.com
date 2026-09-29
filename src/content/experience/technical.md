---
title: "Technical"
---

Pipeline Technical Director and Technical Artist specializing in OpenUSD architecture, Houdini Solaris procedural systems, distributed render farm automation (AWS Thinkbox Deadline / Karma Husk), and cross-platform Python tool development.

### OpenUSD & Pipeline Architecture

* **USD Production Pipeline:** Architected and deployed an end-to-end OpenUSD shot assembly and caching pipeline for cinematic movie production across mixed Linux and Windows environments; structured shots using Assembly Master USDs, Asset Master USDs, and departmental delta USD caches (CFX, FX, Lighting). (2026)
* **Automated Scene Builders:** Developed modular, headless Python scene builders (`assembly_builder`, `cfx_builder`, `comp_builder`) and Prism Pipeline hooks to automate shot ingestion, character instancing, USD stage exports, and one-click/headless reviews. (2026)
* **Solaris Camera & Optical Automation:** Authored an OpenUSD Camera Focus Controller in Solaris evaluating animated UsdSkel joints in 3D world space with automated rack-focus interpolation, dynamic depth of field (`focusDistance`, `fStop`), and symmetrical USD shutter limit calculations (`shutter:open`, `shutter:close`). (2026)
* **Algorithmic Graph Optimization:** Engineered an automated node layout engine (`pipeline.tidy`) using Reingold-Tilford tidy tree layout algorithms, zero-crossing wire routing, and automated geometric validation in Houdini. (2026)

### Distributed Rendering & Farm Automation

* **Deadline Farm Automation & Karma Husk:** Engineered custom AWS Thinkbox Deadline submission workflows and plugins for distributed Karma Husk (XPU/CPU) and Nuke compositing. (2026)
* **Scout Frame Sampling Architecture:** Designed and implemented scout frame sampling (clamped between 2 frames and 35% of shot duration) to launch high-priority validation jobs alongside pre-queued suspended remaining frame jobs with USD stage staleness manifest detection (`manifest.json`), eliminating redundant USD re-exports. (2026)
* **Review & Production Tracking Pipeline:** Integrated Kitsu production tracking via Gazu API and custom Qt dialogs, creating fire-and-forget multi-job dependency chains that trigger automated post-comp 1080p MP4 transcoding with 4-corner slate burn-in and instant review publishing. (2026)
* **Legacy Pipeline Development:** Collaborated closely with TDs to establish robust rendering and lighting pipelines for Maya, Arnold, and Redshift, alongside creating custom tools for everyday production use. (2016–2024)
* **Technical Troubleshooting:** Spearheaded the resolution of complex rendering and compositing bottlenecks, collaborating directly with development teams to debug deep pipeline issues. (2020–2026)

### Unreal Engine

* **Pipeline Integration:** Pioneered the integration of Unreal Engine 5 into the production pipeline; co-developed workflow/pipeline automation alongside the TD and established core project structures. (2023–2024)
* **Technical Art & Materials:** Developed master materials utilized across all movie assets, including stylized material effects and volumetric god rays. (2023–2024)
* **Performance Optimization:** Resolved complex engine performance bottlenecks, optimized lighting/rendering configurations, and authored standardized rendering templates and documentation. (2023–2024)
* **Lighting & Atmosphere:** Crafted cinematic lighting and atmospheric effects to establish mood and visual depth across complex environments and individual shots. (2023–2024)
* **Environment & Procedural Art:** Led environment creation by generating terrains in Houdini, exporting them to Unreal Landscapes, and utilizing PCG (Procedural Content Generation) for asset scattering. (2023–2024)
* **Niagara FX:** Utilized [Niagara FX](https://sydoryk.com/detail/SunnyBunny) to create complex, stylized transitions between cinematic scenes. (2023–2024)

### Procedural Pipeline

* **Marble Shorts:** Engineered a fully automated procedural animation pipeline in Houdini Solaris that generates physics-based marble runs from MIDI (.mid) inputs. The pipeline orchestrates audio synthesis, rigid-body dynamics, particle simulations, project-wide render variations, Nuke compositing, FFmpeg encoding, post-cleanup, and automated delivery to social platforms using a custom web application. [GitHub](https://github.com/SydorykOleh/MultiCast) (2026)
* **3D Visualization Automation:** Engineered a procedural pipeline using Houdini TOPs to automate furniture rendering workflows. Developed a turnkey system that processes 3D models to automatically output specified camera angles, lighting configurations, material variations, and perfectly framed, centered assets. (2025–2026)

### IT Support & Systems Management

* **Render Farm Administration:** Architected, configured, and managed multi-node on-premise and hybrid render farms (AWS Thinkbox Deadline, Karma Husk, Nuke), optimizing resource scheduling, job queues, and pre-job sync verifiers (`pre_job_verify.py`) to eliminate bottlenecks and ensure 24/7 uptime. (2016–2026)
* **Cross-Platform Environment Management:** Directed hardware/software diagnostics, OS provisioning (Windows/Linux), and cross-platform path resolution (`$PRISM_JOB`) across artist workstations to ensure seamless asset portability and minimize downtime. (2016–2026)

### Skills

* **Programming & Scripting:** Python, OpenUSD (pxr API), VEX, PySide / Qt, Shell Scripting (Bash/PowerShell), Git, JavaScript
* **Software:** Houdini (Solaris, Karma XPU/CPU, KineFX, Vellum), OpenUSD, Nuke, AWS Thinkbox Deadline, Prism Pipeline, Kitsu (Gazu API), Unreal Engine 5, Maya, Redshift, Arnold
* **Core Areas:** USD Pipeline Architecture, Pipeline Automation, Distributed Render Management, Solaris LOPs & Lighting, Tools Development, Procedural Asset Generation (PCG/TOPs)