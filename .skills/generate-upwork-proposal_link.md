---
name: generate-upwork-proposal-link
description: Create a custom visual Upwork proposal webpage on sydoryk.com (src/content/upwork/) and pair it with a very short Upwork cover letter hook pointing to the deployed URL. Use this as the primary Upwork workflow.
---

# Generate Upwork Proposal Webpage + Short Link Hook

Create a dedicated, visually polished proposal page in `src/content/upwork/` so the client sees a controlled, high-trust presentation on `sydoryk.com`, paired with a very short plain-text hook for Upwork's cover letter box.

## Process

### 1. Gather Context & Inspect Attachments
- Read the job description, budget/timeline, and any screening questions.
- If the user provides an attachment folder or files (`.xlsx`, `.pdf`, `.step`, `.jpg`, `.png`), inspect every tab, formula, note, embedded image, drawing, metadata field, and reference render before writing. Report only verified facts observed directly in the brief or attachments.
- Read `src/content/experience/lrc.md`, `src/content/experience/technical.md`, `src/data/home.json`, and `docs/portfolio-assets.md` to pull accurate experience and asset paths.

### 2. Build the Proposal Webpage (`src/content/upwork/<slug>.md`)
- **Unique Filename:** Name the file `<client-or-project>.md` in lowercase with hyphens. Check `src/content/upwork/` first and pick a unique slug so existing files are never overwritten.
- **Frontmatter:**
  ```markdown
  ---
  title: Project Proposal for <Client or Project Name>
  company: <Client or Upwork Client>
  role: <Relevant Role Title>
  date: <YYYY-MM-DD>
  ---
  ```
- **Page Content & Tone:**
  - Open directly with the client's target deliverable, verified scope from their brief/attachments, and relevant scale proof.
  - Explain the workflow clearly (e.g., modular CAD/parts prep, procedural Houdini/Solaris assembly, Karma lighting, Nuke post-processing, automated QA) in plain, direct language focused on client outcomes (visual consistency, accurate variants, clean file naming).
  - Use standard punctuation only (periods, commas, colons, parentheses, and regular `-` hyphens). Keep the text free of em dashes (`—`), en dashes (`–`), and AI clichés ("perfectly aligns with", "I specialize in", "utilizing", "delve into", "testament to", "meticulously").
  - **Smooth Kickoff Alignment:** If attachment review uncovers edge cases or spec ambiguities (such as conflicting drawing options, material choices, or duplicate naming formulas), frame them constructively under a concise **"Milestone 1 Alignment"** section rather than an intimidating pre-hire quiz.
  - **Milestones (Fixed-Price Jobs):** Propose a 3-milestone breakdown (Milestone 1 proof renders/lookdev, Milestone 2 core/batch production, Milestone 3 final QA & delivery) aligned with the client's budget and timeline.
  - **Signature (Webpage):** Omit the website URL on the site's own page:
    ```text
    Best regards,  
    Sydoryk Oleh  
    3D Visualization / 3D Animation
    ```
- **Visual Showcase (Follow `docs/portfolio-assets.md`):**
  - When strong matching visuals exist in `public/assets/gallery/` or `public/assets/projects/`, include a compact grid of standalone reference renders (`width: 300px` per `docs/portfolio-assets.md` section 3A) above the case study cards so the client immediately sees relevant quality without clicking away.
  - Include 2-4 HTML case study cards (`minmax(280px, 1fr)` or `minmax(300px, 1fr)` per `docs/portfolio-assets.md` section 3B) linking to `/detail/<slug>` using verified cover paths from `public/assets/cover/` or `src/data/home.json`.

### 3. Verify the Build
- Run `.\node_modules\.bin\astro.cmd build` (or `yarn astro build`) and confirm `dist/upwork/<slug>/index.html` is generated without errors in the new file.

### 4. Draft the Very Short Upwork Cover Letter Hook
Write a tight, human plain-text message (~60-110 words) to paste directly into Upwork's cover letter field. Use zero Markdown (`#`, `*`, `_`, `[links]`), zero em/en dashes (`—`, `–`), and zero AI clichés.

Structure:
1. **First 2 lines (Upwork preview hook):** Immediately answer whether you can deliver their scope with concrete proof from their brief/attachments and relevant experience (e.g., similar variant volume or CAD renders). Skip generic intros like "Hi, my name is...".
2. **Custom proposal link:** State in one crisp sentence what they will see on the custom page (exact workflow, milestone breakdown, kickoff notes, and visual examples) followed by the raw URL `https://sydoryk.com/upwork/<slug>/`.
3. **One easy reply question + short sign-off:** End with a single 10-second question to start the conversation, then:
   ```text
   Best regards,
   Sydoryk Oleh
   ```

Example Hook:
```text
Yes, I can deliver all 1,080 Dominus 1500 rack renders at 1500 x 1500 px under consistent studio lighting. I reviewed your 4-sheet workbook and reference renders, and I previously built a Houdini pipeline that generated 7,000+ catalog variants for a furniture client.

I put together a dedicated proposal page with the exact procedural workflow, milestone plan, a few small drawing details to confirm at kickoff, and relevant examples here:
https://sydoryk.com/upwork/pallet-racks-catalog/

Do you also have raw CAD/STEP files behind Sheet 2, or only the drawings in the Excel workbook?

Best regards,
Sydoryk Oleh
```

### 5. Respond to the User
1. Link to the created `.md` file and state the verified build status plus local preview (`http://localhost:4321/upwork/<slug>/`) and production URL (`https://sydoryk.com/upwork/<slug>/`).
2. Remind the user to push/deploy the site **before** submitting the Upwork proposal so the link is live when the client clicks it.
3. Provide the **Short Upwork Hook** inside a `text` code block for instant copy-pasting.
4. Recommend 2-4 concrete `.jpg`/`.png` images from `public/assets/gallery/` or `src/assets/projects/` to upload as Upwork attachments alongside the hook (plus suggested Upwork milestone amounts if fixed-price, and screening question answers if any).
