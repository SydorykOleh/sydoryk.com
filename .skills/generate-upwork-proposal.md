---
name: generate-upwork-proposal-text
description: Generate a custom, plain-text Upwork job proposal based on a pasted job description, ready to be copied and pasted directly into Upwork. Does not generate any web pages.
---

# Generate Plain-Text Upwork Job Proposal

Generate a custom Upwork job proposal tailored from your past successful applications and output it as plain text for easy copy-pasting into Upwork's submission box.

## Process

### 1. Gather Context
- Read the job description and screening questions provided by the user.
- Read `docs/skills.md` to refresh your understanding of the user's background.

### 2. Extract Information
Analyze the job description to identify:
- **Project Scope & Needs**: What exactly does the client need built/rendered?
- **Workflow & Technical Requirements**: What software/pipeline is relevant?
- **Screening Questions**: Any specific questions asked by the client.

### 3. Draft the Proposal (Cover Letter)
Write a tailored cover letter based on the user's successful past proposals. DO NOT use any Markdown formatting characters (like `#`, `*`, or `_`). Just use plain text with line breaks and spaces so it reads cleanly when pasted into Upwork. Add an empty line between paragraphs or sections to keep it readable, but keep related list items grouped logically without excessive blank lines.
- **Tone**: Natural, conversational, and human. Make the text sound less "perfect" or robotic. DO NOT use obvious AI buzzwords or phrases like "perfectly aligns with", "I specialize in", "utilizing", "delve into", "testament to", etc. Do NOT use em dashes (`—`) or en dashes (`–`); instead use commas, parentheses, or just rephrase. Keep it casual but professional, like a real freelancer sending a quick, direct email.
- **The Hook (Introduction)**: DO NOT use generic introductions like "Hi, my name is...". Your first sentence should immediately address their problem in a natural, conversational way. Mirror their keywords for the "Best Match" algorithm, but weave them in naturally without sounding like an AI regurgitating the prompt (e.g., "I've done a lot of work converting SolidWorks CAD files into photorealistic renders" instead of "I have extensively converted SolidWorks CAD drawings into production-ready renders, which perfectly aligns with your need").
- **Workflow & Approach**: Use a plain text heading like "Proposed Workflow:" (with no markdown). Detail exactly how you will execute the project. Use a clear step-by-step list using hyphens (`- `) but do NOT use bold text.
- **Software Alignment**: Mention Houdini, Solaris, Karma, or Unreal Engine where relevant.
- **Pricing/Quotes**: If the user provides a quote or the job has a clear fixed scope, include it directly.
- **Relevant Examples**: List 2-3 highly relevant portfolio items from `src/data/home.json`. Since this will be pasted directly into Upwork, include the project name, a raw URL, and a few words describing the project example.
    - Example:
      - Industrial Equipment: https://sydoryk.com/detail/IndustrialEquipment/ - Product visualization showcasing complex mechanical parts.
      - Conservatory: https://sydoryk.com/detail/Conservatory/ - time-lapse animation in Airbnb style.
- **Call to Action & Availability**: At the end of the proposal (before the signature), mention that you are currently available and interested to discuss the project in more detail.
- **Signature**: Always close with the following exact format, ensuring your website link is at the very bottom:
  ```text
  Best regards,  
  Sydoryk Oleh  
  3D Visualization / 3D Animation
  https://sydoryk.com/
  ```

### 4. Answer Screening Questions
If the client has screening questions, list each question and provide a direct, technical, and confident answer below it. 

### 5. Respond to the User
When outputting your response in the chat:
1. Provide the entire generated proposal inside a text code block so the user can easily copy and paste it into Upwork. Ensure absolutely NO Markdown formatting (`#`, `*`, `_`, etc.) is in the proposal text itself.
2. Include the answers to any screening questions directly below the proposal.
3. Ask the user if they would like to refine the hook, the workflow steps, or the portfolio links.
4. **Crucial:** Remind the user: *"If you want to create a beautifully formatted webpage for this proposal and get a short Upwork hook link, run the `generate-upwork-proposal_link` skill next!"*
