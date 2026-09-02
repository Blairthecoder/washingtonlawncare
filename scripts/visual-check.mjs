import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const output = path.join(process.cwd(), '.qa');
const port = process.env.PORT || '4174';
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.BROWSER_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
});
const checks = [
  ['home-desktop', '/', { width: 1440, height: 1000 }],
  ['home-mobile', '/', { width: 390, height: 844 }],
  ['service-desktop', '/services/lawn-care/', { width: 1440, height: 1000 }],
  ['area-mobile', '/areas/lake-charles/', { width: 390, height: 844 }],
  ['contact-mobile', '/contact/', { width: 390, height: 844 }]
];

for (const [name, route, viewport] of checks) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.8) {
      window.scrollTo(0, y);
      await delay(35);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  const h1Count = await page.locator('h1').count();
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: true });
  console.log(`${name}: status=${response?.status()} h1=${h1Count} overflow=${overflow} consoleErrors=${errors.length}`);
  if (errors.length) console.log(errors.map(error => `  ${error}`).join('\n'));
  if (!response?.ok() || h1Count !== 1 || overflow || errors.length) process.exitCode = 1;
  await page.close();
}

await browser.close();
