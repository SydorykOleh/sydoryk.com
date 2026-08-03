import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const cssPath = path.resolve('src/content/experience/resume.css');

async function buildCoverLetter(sourceFile) {
    if (!sourceFile) {
        console.error('Please provide a path to the cover letter markdown file.');
        process.exit(1);
    }
    
    const absoluteSource = path.resolve(sourceFile);
    if (!fs.existsSync(absoluteSource)) {
        console.error(`Source file not found: ${absoluteSource}`);
        process.exit(1);
    }
    
    // determine output path: same dir, but .pdf extension
    const dir = path.dirname(absoluteSource);
    const basename = path.basename(absoluteSource, '.md');
    // Save the PDF to the public/assets/coverletter directory so it can be downloaded/viewed easily
    const outputDir = path.resolve('public/assets/coverletter');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const output = path.resolve(outputDir, `${basename}.pdf`);

    console.log(`Generating PDF cover letter using Puppeteer and Marked...`);
    const css = fs.readFileSync(cssPath, 'utf8');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        console.log(`Converting ${absoluteSource} -> ${output}`);
        const markdown = fs.readFileSync(absoluteSource, 'utf8');

        // Remove frontmatter simply
        let mdContent = markdown.replace(/^---[\s\S]*?---/, '').trim();

        // Remove markdown images and videos from the PDF so they only appear on the web page
        mdContent = mdContent.replace(/!\[.*?\]\(.*?\)/g, '');
        mdContent = mdContent.replace(/<div[^>]*video-embed[^>]*>[\s\S]*?<\/div>/gi, '');
        mdContent = mdContent.replace(/<video[\s\S]*?<\/video>/gi, '');

        // Inject header for the PDF resumes
        const headerMarkdown = `# Oleh Sydoryk\nKrakow, Poland ❖ oleh@sydoryk.com ❖ +48 793 198 675`;
        
        const slug = basename.toLowerCase();
        const linkMarkdown = `**Interactive Cover Letter & Portfolio**: [https://sydoryk.com/${slug}](https://sydoryk.com/${slug})\n\n`;

        // Convert HTML portfolio cards into a simple text list for the PDF
        let processedContent = mdContent.replace(/<h3.*?>Relevant Portfolio Examples<\/h3>[\s\S]*?(?=<style|<\/body>|$)/gi, (match) => {
            const cardRegex = /<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<h4[^>]*>([\s\S]*?)<\/h4>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/a>/gi;
            let listMarkdown = '### Relevant Portfolio Examples\n\n';
            let cardMatch;
            while ((cardMatch = cardRegex.exec(match)) !== null) {
                let link = cardMatch[1];
                if (link.startsWith('/detail/')) {
                    link = 'https://sydoryk.com' + link;
                }
                const title = cardMatch[2].trim();
                listMarkdown += `- **[${title}](${link})**\n`;
            }
            return listMarkdown;
        });

        const headerHtml = `<div class="resume-header">\n${marked.parse(headerMarkdown)}</div>`;
        const htmlContent = headerHtml + '\n' + marked.parse(linkMarkdown) + marked.parse(processedContent);

        const titleMatch = markdown.match(/^title:\s*(.+)$/m);
        const docTitle = titleMatch ? titleMatch[1].replace(/['"]/g, '') + ' - Oleh Sydoryk' : 'Oleh Sydoryk - Cover Letter';

        const finalHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${docTitle}</title>
            <style>${css}</style>
            <style>
                /* Additional cover letter specific styles */
                :root {
                    --color-100: #000000;
                    --color-300: #444444;
                    --color-700: #cccccc;
                }
                body { font-size: 12px; }
                p { margin-bottom: 16px; }
                .resume-header { margin-bottom: 48px; }
                a { color: #0056b3 !important; text-decoration: underline !important; border-bottom: none !important; }
            </style>
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
        `;

        const page = await browser.newPage();
        await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: output,
            format: 'A4',
            margin: { top: '12mm', right: '20mm', bottom: '20mm', left: '20mm' },
            printBackground: true
        });

        await page.close();
        console.log(`Successfully generated ${output}`);
    } catch (error) {
        console.error(`Error generating ${output}:`, error);
    }

    await browser.close();
}

const args = process.argv.slice(2);
buildCoverLetter(args[0]);
