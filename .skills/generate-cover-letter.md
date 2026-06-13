---
name: generate-cover-letter
description: Generate a custom cover letter markdown file based on a pasted job description. Use when the user wants to apply for a new job and needs a tailored cover letter created automatically.
---

# Generate Cover Letter

Generate a custom cover letter based on a provided job description and save it to the correct location.

## Process

### 1. Gather Context
- Read the job description provided by the user in their prompt.
- Read `src/content/experience/it.md`, `src/content/experience/lrc.md` and `src/content/experience/technical.md` to refresh your understanding of the user's professional background, skills, and experience.
- Read `src/content/coverletter/template.md` to understand the example of structure and frontmatter required for a cover letter.

### 2. Extract Information
Analyze the job description to identify:
- **Company Name** (`<company>`)
- **Position/Role** (`<position>`)
- Key requirements and skills desired by the employer.

### 3. Draft the Cover Letter
Write a tailored cover letter that follows the structure of `template.md`:
- **Template Usage**: `template.md` is now a master repository containing multiple variant paragraphs for different roles (Unreal, Lighting, Procedural, Product, IT). You must CHERRY-PICK only the 1-2 paragraphs that are highly relevant to the job description. Discard the rest. Do NOT copy the bracketed instructions (e.g., `[For Unreal Engine...]`).
- **Tone**: Professional, conversational, and human. Make the text sound less "perfect" or robotic. Use a simple "Hi," to start. DO NOT use obvious AI buzzwords or phrases like "perfectly aligns with", "I specialize in", "utilizing", "delve into", "testament to", etc. Do NOT use em dashes (`—`) or en dashes (`–`). Keep it casual and direct. If there is a missing skill, mention it honestly but bridge it to existing experience.
- **Resume Link for Justjoin.it**: If the user is applying for an IT job specifically from `justjoin.it` (mentioned in the prompt or job description), you MUST include a direct link to the IT resume at the top of the cover letter, right after the "Hi," greeting. Use this exact markdown: `You can view my full resume here: [Resume (PDF)](https://sydoryk.com/assets/resume_SydorykOleh_IT.pdf)`.
- Highlight specific experiences from `src/content/experience/` md files that align directly with the job description's key requirements.
- **Portfolio & GitHub**: Link specific examples in your portfolio. For IT, DevOps, or Systems Administration roles, explicitly include links to your GitHub profile (e.g., `[GitHub](https://github.com/SydorykOleh)`) or relevant GitHub repositories within the text to showcase your technical code instead of visual portfolio examples.
- **Location**: When relevant, mention that you are located in Krakow.
- **Call to Action & Availability**: At the end of the cover letter (before the signature), mention that you are currently available and interested to discuss the position in more detail.
- **Signature**: Always close with the following exact format:
  ```text
  Cheers,  
  Oleh  
  ```
- **CRITICAL:** Do NOT include any meta-notes, AI conversational text, or explanations (e.g., "*Note: this cover letter is structured...*") inside the markdown file itself. The generated file must strictly contain only the cover letter content.
- Ensure the Markdown frontmatter is perfectly formatted with the extracted information:
  ```markdown
  ---
  title: Application for <position>
  company: <company>
  role: <position>
  date: <current-date-YYYY-MM-DD>
  ---
  ```
- **HTML Portfolio Cards**: At the bottom of the markdown file, include an HTML grid of 2-4 highly relevant portfolio items from `src/data/home.json` so the web page looks premium. **CRITICAL:** Do NOT include the portfolio examples section if the user is applying for an IT, DevOps, or Systems Administration role.
  ```html
  <h3>Relevant Portfolio Examples</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
    <!-- Render each item as an <a> tag linking to its detail page. Use <img> or <video> based on the cover property -->
    <a href="[DETAIL_PATH]" target="_blank" style="text-decoration: none; color: inherit; border: 1px solid var(--color-700); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); transition: transform 0.2s;">
      <img src="[COVER_PATH]" alt="[TITLE]" style="width: 100%; height: 180px; object-fit: cover; border-bottom: 1px solid var(--color-700);" />
      <div style="padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--color-100);">[TITLE]</h4>
        <p style="margin: 0; font-size: 0.9rem; color: var(--color-300);">[DESC]</p>
      </div>
    </a>
  </div>
  ```

### 4. Create the Files
- Determine the filename using the format `CoverLetter_SydorykOleh_<company>_<position>.md`. Replace spaces with underscores or hyphens. **CRITICAL: The final filename MUST be shorter than 60 characters** because companies often reject long file names. If the position name is too long, shorten or abbreviate it (e.g., use `CoverLetter_SydorykOleh_EGGER.md` if the role is long).
- Use your file writing tools to save the new markdown file in the `src/content/coverletter/` directory.
- **Generate PDF Version**: After saving the markdown file, use the command `node scripts/build-cover-letter.js src/content/coverletter/<filename>.md` to generate the PDF version. This script will automatically inject a link to the interactive web version at the top of the PDF, strip out the web-only portfolio cards, and output a formatted PDF in the `public/assets/coverletter` directory.

### 5. Respond to the User
- Present a clickable link to the newly created markdown file for the website.
- Inform the user that the PDF version has been generated at `public/assets/coverletter/<filename>.pdf`, and have a link to the file.
- Inform the user of the URL where the online cover letter will be available. **IMPORTANT**: Astro automatically lowercases slugs, so the URL must be entirely lowercase (e.g., `https://sydoryk.com/coverletter_sydorykoleh_<position>_<company>`). Also provide the localhost link using the lowercase slug.
- Ask the user if they would like to make any adjustments to the generated text.
