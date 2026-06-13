import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const resumes = [
    { source: 'src/content/experience/lrc.md', output: 'public/assets/resume_SydorykOleh.pdf' },
    { source: 'src/content/experience/technical.md', output: 'public/assets/resume_SydorykOleh_TA.pdf' },
    { source: 'src/content/experience/it.md', output: 'public/assets/resume_SydorykOleh_IT.pdf' }
];

const cssPath = path.resolve('src/content/experience/resume.css');

async function buildPdfs() {
    console.log('Generating PDF resumes using Puppeteer and Marked...');
    const css = fs.readFileSync(cssPath, 'utf8');

    // Launch browser once
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const resume of resumes) {
        if (!fs.existsSync(resume.source)) {
            console.warn(`Source file not found: ${resume.source}`);
            continue;
        }

        try {
            console.log(`Converting ${resume.source} -> ${resume.output}`);
            const markdown = fs.readFileSync(resume.source, 'utf8');
            
            // Remove frontmatter simply
            const mdContent = markdown.replace(/^---[\s\S]*?---/, '').trim();
            
            // Inject header for the PDF resumes
            const headerMarkdown = `
<div class="resume-header">

# Oleh Sydoryk
Krakow, Poland ❖ [oleh@sydoryk.com](mailto:oleh@sydoryk.com) ❖ +48 793 198 675 ❖ [sydoryk.com](https://sydoryk.com)

</div>

`;
            
            const htmlContent = marked.parse(headerMarkdown + mdContent);
            
            const finalHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>${css}</style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
            `;

            const page = await browser.newPage();
            await page.setContent(finalHtml, { waitUntil: 'networkidle0' });
            
            await page.pdf({ 
                path: resume.output, 
                format: 'A4', 
                margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
                printBackground: true 
            });
            
            await page.close();
            console.log(`Successfully generated ${resume.output}`);
        } catch (error) {
            console.error(`Error generating ${resume.output}:`, error);
        }
    }
    
    await browser.close();
    console.log('Finished generating PDF resumes.');
}

buildPdfs();
