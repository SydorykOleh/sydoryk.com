---
name: generate-upwork-proposal-text
description: Generate a plain-text Upwork cover letter when the user explicitly wants the full proposal pasted directly into Upwork without creating a webpage. For the short-hook plus deployed webpage workflow, use generate-upwork-proposal-link instead.
---

# Generate Plain-Text Upwork Job Proposal

Write a concise, natural-sounding plain-text Upwork proposal for direct copy-pasting into Upwork's submission box.

## Process

### 1. Gather Context & Inspect Attachments
- Read the job description and any screening questions provided by the user.
- If the user provides an attachment folder or files (`.xlsx`, `.pdf`, `.step`, `.jpg`, `.png`), inspect every sheet, embedded image, engineering drawing, metadata field, and reference photo before drafting. Only cite numbers, part names, and edge cases directly observed in those files.
- Read `src/content/experience/lrc.md` and `src/content/experience/technical.md` for background context, and check `src/data/home.json` for relevant portfolio links.

### 2. Draft the Cover Letter (Plain Text)
Write directly to the client like a senior technical artist messaging a business owner. Use plain text only (no Markdown syntax like `#`, `*`, `_`, or `[text](url)`), with single blank lines between sections.

- **Inbox Preview Hook (First 2 Lines):** Upwork truncates previews to roughly 150-200 characters. Open immediately by addressing the client's core deliverable with a concrete proof point or detail observed in their attachments. Skip generic openers like "Hi, my name is...".
- **Human Phrasing & Punctuation:** Use active, plain language with standard punctuation (periods, commas, colons, parentheses, and simple `-` hyphens). Keep text free of em dashes (`—`), en dashes (`–`), and AI clichés (such as "perfectly aligns with", "I specialize in", "utilizing", "delve into", "testament to", "meticulously").
- **Workflow & Outcome:** Group steps under a plain heading like `Proposed Workflow:` using `- ` bullets. Mention Houdini, Solaris, Karma, Unreal Engine, or Nuke only where they solve the client's production bottleneck (consistency, scale, precision).
- **Milestones / Pricing:** For fixed-price jobs, suggest a 3-milestone split (Proof/Lookdev, Core Production, Final QA/Delivery) to reduce buyer risk.
- **Relevant Examples:** Include 2-3 matching portfolio items from `src/data/home.json` using plain raw URLs:
  ```text
  - Industrial Equipment (complex mechanical CAD renders): https://sydoryk.com/detail/IndustrialEquipment/
  - Sofa Collections (7,000+ procedural catalog variations): https://sydoryk.com/detail/Sofas/
  ```
- **Closing Call to Action:** End with one low-friction, 10-second question to invite a reply, followed by the exact signature:
  ```text
  Best regards,
  Sydoryk Oleh
  3D Visualization / 3D Animation
  https://sydoryk.com/
  ```

### 3. Screening Questions & Attachments
- If the job includes screening questions, answer each concisely below the cover letter with concrete technical clarity.
- Suggest 2-4 matching `.jpg` or `.png` portfolio renders from `public/assets/gallery/` or `src/assets/projects/` to upload directly as Upwork attachments (noting if a `.webp` needs converting to `.jpg`/`.png` for Upwork).

### 4. Output to User
- Put the ready-to-paste cover letter inside a plain `text` code block.
- List screening question answers (if any) and recommended Upwork image attachments below it.
- Remind the user: *"If you want to send a short hook in Upwork pointing to a full visual proposal page on your site, run `generate-upwork-proposal_link` instead."*
