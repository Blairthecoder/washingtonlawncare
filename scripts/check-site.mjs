import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(), 'dist');
const htmlFiles = [];

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const file = path.join(dir, name);
    if ((await stat(file)).isDirectory()) await walk(file);
    else if (file.endsWith('.html')) htmlFiles.push(file);
  }
}

await walk(root);
const failures = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${file}: missing title`);
  if (!/<meta name="description"/.test(html)) failures.push(`${file}: missing description`);
  if (!/<h1[ >]/.test(html)) failures.push(`${file}: missing h1`);
  const images = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)];
  for (const match of images) {
    if (!/alt="[^"]*"/.test(match[0])) failures.push(`${file}: image missing alt`);
    if (match[1].startsWith('/assets/')) {
      const local = path.join(root, match[1].slice(1));
      try { await stat(local); } catch { failures.push(`${file}: missing asset ${match[1]}`); }
    }
  }
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split(/[?#]/)[0];
    if (href.startsWith('/assets/') || href === '/') continue;
    const candidate = href.endsWith('/') ? path.join(root, href, 'index.html') : path.join(root, href);
    try { await stat(candidate); } catch { failures.push(`${file}: broken internal link ${href}`); }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML pages; titles, descriptions, headings, assets and internal links passed.`);
