import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DEFAULT_BASE_URL = process.env.PUBLIC_SITE_URL || 'https://sydoryk.com';
const DEFAULT_TIMEOUT_SEC = 300;
const DEFAULT_INTERVAL_SEC = 10;

/**
 * Parse CLI arguments into targets and options.
 * @param {string[]} argv
 */
function parseArgs(argv) {
	const opts = {
		baseUrl: DEFAULT_BASE_URL.replace(/\/+$/, ''),
		timeoutSec: DEFAULT_TIMEOUT_SEC,
		intervalSec: DEFAULT_INTERVAL_SEC,
		commits: 1,
		expected: null,
		targets: [],
	};

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === '--base' && argv[i + 1]) {
			opts.baseUrl = argv[++i].replace(/\/+$/, '');
		} else if (arg === '--timeout' && argv[i + 1]) {
			opts.timeoutSec = Math.max(1, Number(argv[++i]) || DEFAULT_TIMEOUT_SEC);
		} else if (arg === '--interval' && argv[i + 1]) {
			opts.intervalSec = Math.max(1, Number(argv[++i]) || DEFAULT_INTERVAL_SEC);
		} else if (arg === '--commits' && argv[i + 1]) {
			opts.commits = Math.max(1, Number(argv[++i]) || 1);
		} else if (arg === '--expected' && argv[i + 1]) {
			opts.expected = argv[++i];
		} else if (arg === '--help' || arg === '-h') {
			printUsage();
			process.exit(0);
		} else {
			opts.targets.push(arg);
		}
	}
	return opts;
}

function printUsage() {
	console.log(`Usage: node scripts/verify-deploy.js [targets...] [options]

Targets can be:
  - Route paths: /upwork/pallet-racks-catalog/
  - Full URLs:   https://sydoryk.com/upwork/pallet-racks-catalog/
  - Repo files:  src/content/upwork/pallet-racks-catalog.md
  - (Omitted):   Auto-detects routes/assets from the latest git commit + /

Options:
  --base <url>       Site base URL (default: ${DEFAULT_BASE_URL})
  --timeout <sec>    Max wait time in seconds (default: ${DEFAULT_TIMEOUT_SEC})
  --interval <sec>   Poll interval in seconds (default: ${DEFAULT_INTERVAL_SEC})
  --commits <n>      Number of recent commits to inspect when targets are omitted (default: 1)
  --expected <text>  Required substring on target HTML pages`);
}

/**
 * Extract frontmatter title from a Markdown file if present.
 * @param {string} filePath
 * @returns {string | null}
 */
function readFrontmatterTitle(filePath) {
	if (!fs.existsSync(filePath)) return null;
	const text = fs.readFileSync(filePath, 'utf8');
	const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!fm) return null;
	const titleLine = fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);
	return titleLine ? titleLine[1].trim() : null;
}

/**
 * Map a repo-relative file path to a live deploy check target, or null if non-routed.
 * @param {string} relPath
 * @returns {{ route: string, expected: string | null, isPage: boolean } | null}
 */
function mapRepoFileToTarget(relPath) {
	const norm = relPath.replace(/\\/g, '/').replace(/^\.\//, '');
	const absPath = path.resolve(norm);

	if (norm.startsWith('src/content/upwork/') && norm.endsWith('.md')) {
		const slug = path.basename(norm, '.md').toLowerCase();
		return { route: `/upwork/${slug}/`, expected: readFrontmatterTitle(absPath), isPage: true };
	}
	if (norm.startsWith('src/content/projects/') && /\.mdx?$/.test(norm)) {
		const slug = norm.replace('src/content/projects/', '').replace(/\.mdx?$/, '');
		return { route: `/detail/${slug}`, expected: readFrontmatterTitle(absPath), isPage: true };
	}
	if (norm.startsWith('src/content/blog/') && /\.mdx?$/.test(norm)) {
		const slug = path.basename(norm, path.extname(norm)).toLowerCase();
		return { route: `/blog/${slug}/`, expected: readFrontmatterTitle(absPath), isPage: true };
	}
	if (norm.startsWith('src/content/coverletter/') && norm.endsWith('.md')) {
		const slug = path.basename(norm, '.md').toLowerCase();
		return { route: `/${slug}/`, expected: readFrontmatterTitle(absPath), isPage: true };
	}
	if (norm.startsWith('src/pages/') && norm.endsWith('.astro') && !norm.includes('[')) {
		const sub = norm.replace('src/pages/', '').replace(/\.astro$/, '');
		const route = sub === 'index' ? '/' : `/${sub.replace(/\/index$/, '')}/`;
		return { route, expected: null, isPage: true };
	}
	if (norm.startsWith('public/') && fs.existsSync(absPath)) {
		return { route: `/${norm.slice('public/'.length)}`, expected: null, isPage: false };
	}
	return null;
}

/**
 * Resolve CLI target arguments (or latest commit files) into normalized check specs.
 * @param {ReturnType<typeof parseArgs>} opts
 */
function resolveTargets(opts) {
	const resolved = [];
	const seen = new Set();

	const addTarget = (target) => {
		if (!target || seen.has(target.route)) return;
		seen.add(target.route);
		resolved.push(target);
	};

	if (opts.targets.length > 0) {
		for (const raw of opts.targets) {
			if (/^https?:\/\//i.test(raw)) {
				const u = new URL(raw);
				addTarget({
					route: u.pathname + u.search,
					expected: opts.expected,
					isPage: !/\.[a-z0-9]{2,5}$/i.test(u.pathname),
					baseOverride: `${u.protocol}//${u.host}`,
				});
				continue;
			}
			const mapped = mapRepoFileToTarget(raw);
			if (mapped) {
				addTarget({ ...mapped, expected: opts.expected || mapped.expected });
				continue;
			}
			const route = raw.startsWith('/') ? raw : `/${raw}`;
			addTarget({
				route,
				expected: opts.expected,
				isPage: !/\.[a-z0-9]{2,5}$/i.test(route),
			});
		}
		return resolved;
	}

	try {
		const cmd =
			opts.commits > 1
				? `git diff --name-only HEAD~${opts.commits}..HEAD`
				: 'git diff-tree --no-commit-id --name-only -r HEAD';
		const out = execSync(cmd, {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		});
		for (const line of out.split(/\r?\n/)) {
			const file = line.trim();
			if (!file) continue;
			const mapped = mapRepoFileToTarget(file);
			if (mapped) addTarget(mapped);
		}
	} catch {
		// Fall back to homepage check if git metadata is unavailable
	}

	addTarget({ route: '/', expected: opts.expected, isPage: true });
	return resolved;
}

/**
 * Verify a static asset URL returns HTTP 200 or 206.
 * @param {string} url
 */
async function checkAsset(url) {
	const headers = { 'Cache-Control': 'no-cache' };
	let res = await fetch(url, { method: 'HEAD', redirect: 'follow', headers });
	if (res.status === 405 || res.status === 501) {
		res = await fetch(url, {
			method: 'GET',
			redirect: 'follow',
			headers: { ...headers, Range: 'bytes=0-0' },
		});
	}
	if (res.status !== 200 && res.status !== 206) {
		return { ok: false, url, reason: `HTTP ${res.status}` };
	}
	return { ok: true, url, status: res.status };
}

/**
 * Extract local /assets/ media URLs referenced inside a rendered HTML page.
 * @param {string} html
 * @returns {string[]}
 */
function extractPageAssets(html) {
	const assets = new Set();
	const regex = /(?:src|href)=["'](\/assets\/[^"'#?]+)["']/gi;
	let match;
	while ((match = regex.exec(html)) !== null) {
		if (!match[1].endsWith('/')) assets.add(match[1]);
	}
	return [...assets];
}

function decodeHtmlEntities(str) {
	return str
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}

/**
 * Check a single HTML page (and its embedded /assets/ media) or standalone asset.
 * @param {string} baseUrl
 * @param {{ route: string, expected: string | null, isPage: boolean, baseOverride?: string }} target
 */
async function verifyTarget(baseUrl, target) {
	const root = target.baseOverride || baseUrl;
	const url = `${root}${target.route}`;

	if (!target.isPage) {
		const res = await checkAsset(url);
		return res.ok
			? { ok: true, summary: `${url} -> HTTP ${res.status}` }
			: { ok: false, reason: `${url} -> ${res.reason}` };
	}

	const res = await fetch(url, {
		method: 'GET',
		redirect: 'follow',
		headers: { 'Cache-Control': 'no-cache' },
	});
	if (res.status !== 200) {
		return { ok: false, reason: `${url} -> HTTP ${res.status}` };
	}

	const html = await res.text();
	const decodedHtml = decodeHtmlEntities(html);
	if (decodedHtml.includes('404 Not Found') && decodedHtml.includes("There's nothing here.")) {
		return { ok: false, reason: `${url} -> rendered Astro 404 body` };
	}
	if (target.expected && !decodedHtml.toLowerCase().includes(target.expected.toLowerCase())) {
		return { ok: false, reason: `${url} -> missing expected text "${target.expected}"` };
	}

	const assetPaths = extractPageAssets(html);
	const assetResults = await Promise.all(assetPaths.map((p) => checkAsset(`${root}${p}`)));
	const failedAssets = assetResults.filter((r) => !r.ok);
	if (failedAssets.length > 0) {
		const details = failedAssets.map((a) => `${a.url} (${a.reason})`).join(', ');
		return { ok: false, reason: `${url} -> broken asset(s): ${details}` };
	}

	return {
		ok: true,
		summary: `${url} -> HTTP 200${target.expected ? ` (matched "${target.expected}")` : ''}, ${assetPaths.length} asset(s) OK`,
	};
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
	const opts = parseArgs(process.argv.slice(2));
	const targets = resolveTargets(opts);

	console.log(`Verifying ${targets.length} target(s) against ${opts.baseUrl} (timeout: ${opts.timeoutSec}s)...`);
	const deadline = Date.now() + opts.timeoutSec * 1000;
	let attempt = 0;

	while (true) {
		attempt++;
		const results = await Promise.all(
			targets.map((t) =>
				verifyTarget(opts.baseUrl, t).catch((err) => ({
					ok: false,
					reason: `${t.route} -> ${err.message}`,
				})),
			),
		);

		const failures = results.filter((r) => !r.ok);
		if (failures.length === 0) {
			for (const r of results) console.log(`PASS: ${r.summary}`);
			console.log(`Deploy verified on attempt ${attempt}.`);
			process.exit(0);
		}

		const remainingMs = deadline - Date.now();
		if (remainingMs <= 0) {
			for (const r of results) {
				console.error(r.ok ? `PASS: ${r.summary}` : `FAIL: ${r.reason}`);
			}
			console.error(`Deploy verification failed after ${attempt} attempt(s).`);
			process.exit(1);
		}

		console.log(`Attempt ${attempt} pending: ${failures.map((f) => f.reason).join(' | ')}`);
		await sleep(Math.min(opts.intervalSec * 1000, remainingMs));
	}
}

main();
