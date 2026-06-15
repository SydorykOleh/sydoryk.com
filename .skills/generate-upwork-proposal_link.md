---
name: generate-upwork-proposal-link
description: Take a generated Upwork proposal text, format it as a markdown web page on your site, add visual portfolio links, and generate a short link hook to paste into Upwork.
---

# Generate Upwork Proposal Web Page & Hook

Take a previously generated plain-text Upwork proposal (e.g. from the `generate-upwork-proposal` skill), format it beautifully into a custom web page for the client, and provide a short hook link to use for the actual application.

## Process

### 1. Generate Proposal & Gather Context
- First, use the `generate-upwork-proposal` skill to generate the initial plain-text proposal based on the client's job description.
- Identify the key skills and requirements mentioned in the proposal to select the best portfolio items.

### 2. Create the Web Page File
Generate the markdown file to be saved in `src/content/upwork/`. 
- Determine the filename using the format `<client-or-project>.md`. Convert it to lowercase and replace spaces with hyphens.
- Include proper frontmatter:
  ```markdown
  ---
  title: Project Proposal for <client or project name>
  company: <client or Upwork Client>
  role: <position>
  date: <YYYY-MM-DD>
  ---
  ```
- **Format the Proposal Text**: Adjust the generated proposal text accordingly to publish on the website. Add markdown headings (like `### Proposed Workflow`), bullet points, and bold text where appropriate to make it highly readable and professional.
- **Remove Website Link**: From the signature at the end of the proposal text, remove the website link so it reads exactly as:
  ```text
  Best regards,  
  Sydoryk Oleh  
  3D Visualization / 3D Animation
  ```
- **HTML Portfolio Cards**: At the bottom of the markdown file, include an HTML grid of 2-4 highly relevant portfolio items from `src/data/home.json` so the web page looks premium:
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

### 3. Respond to the User
When outputting your response in the chat:
1. Provide a clickable link to the local preview `http://localhost:4321/upwork/<client>` so the user can review it immediately, and mention the custom webpage will be available at `https://sydoryk.com/upwork/<client>`. Provide a clickable link to the generated markdown file.
2. Provide a **Short Upwork Hook**. This is a short, highly-optimized snippet that the user will paste into Upwork *instead* of the full proposal text (since the full text is now on the webpage). This hook MUST NOT contain generic introductions. It must immediately address the client's problem and provide a direct link to the custom webpage to funnel the client there.
   - Example Hook: 
     "I have extensive experience converting SolidWorks CAD files into photorealistic renders, which perfectly aligns with your project needs. Since you already have detailed CAD files, we can jump straight into production efficiently. I've prepared a custom proposal detailing my exact workflow, pricing, and relevant portfolio examples specifically for your project. You can view it here: https://sydoryk.com/upwork/<client>"
3. Ask the user if they would like to refine the hook, the webpage content, or the portfolio links selected.
