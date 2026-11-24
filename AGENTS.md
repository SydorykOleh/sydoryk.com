# Workspace Instructions (sydoryk.com)

## Website Commit, Sync & Post-Push Deploy Check
After every commit, pull/rebase, and push to `origin/main` for the website:
1. Run `.\node_modules\.bin\astro.cmd build` before committing whenever `src/`, `public/`, or config files changed.
2. Sync if needed (`git pull --rebase origin main`) and push (`git push origin main`) so Cloudflare Pages starts deploying.
3. Run `node scripts/verify-deploy.js` (pass modified content/page paths or `--commits <n>` when pushing multiple commits) and wait for `PASS` (`HTTP 200`, matched titles, `0` broken assets) before telling the user the change is live.

## Repo Skills
Read the matching skill file before acting:
- Upwork proposal with deployed webpage and short Upwork hook: `.skills/generate-upwork-proposal_link.md`
- Plain-text Upwork proposal only (no webpage): `.skills/generate-upwork-proposal.md`
- Job cover letter webpage and PDF: `.skills/generate-cover-letter.md`
