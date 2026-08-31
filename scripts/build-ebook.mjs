// Builds the branded ebook PDF from content/ebook/manuscript/*.md using the
// installed Chrome (via puppeteer-core). Run: node scripts/build-ebook.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manuscriptDir = path.join(root, "content/ebook/manuscript");
const outPath = path.join(
  root,
  "content/ebook/from-chatgpt-curiosity-to-operational-leverage.pdf",
);

const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const TITLE = "From ChatGPT Curiosity to Operational Leverage";
const SUBTITLE = "Stop Prompting. Start Automating.";

// Reading order.
const order = [
  "foreword.md",
  "how-to-use-this-book.md",
  "chapter-01-ai-without-the-hype.md",
  "chapter-02-prompts-the-new-business-literacy.md",
  "chapter-03-workflows-from-one-off-answers-to-repeatable-results.md",
  "chapter-04-automation-connecting-the-dots.md",
  "chapter-05-ai-agents-giving-ai-a-job.md",
  "chapter-06-agent-loops-when-ai-can-keep-working.md",
  "chapter-07-graph-engineering-mapping-how-the-business-thinks.md",
  "chapter-08-choosing-your-first-ai-project.md",
];

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Pull the first H1 as the section title; return { title, bodyHtml }.
function renderSection(md) {
  const lines = md.split(/\r?\n/);
  const h1Index = lines.findIndex((l) => /^#\s+/.test(l));
  const title =
    h1Index >= 0 ? lines[h1Index].replace(/^#\s+/, "").trim() : "Untitled";
  const rest = lines.filter((_, i) => i !== h1Index).join("\n");
  return { title, bodyHtml: marked.parse(rest) };
}

const sections = order.map((file) => {
  const md = fs.readFileSync(path.join(manuscriptDir, file), "utf8");
  const { title, bodyHtml } = renderSection(md);
  return { id: slugify(title), title, bodyHtml };
});

const logoDataUri = (() => {
  const p = path.join(
    root,
    "public/images/brand/st-lockup-white-transparent.png",
  );
  const b64 = fs.readFileSync(p).toString("base64");
  return `data:image/png;base64,${b64}`;
})();

const toc = sections
  .map(
    (s) =>
      `<li><span class="toc-title">${s.title}</span><span class="toc-dots"></span></li>`,
  )
  .join("\n");

const body = sections
  .map(
    (s) => `
    <section class="chapter" id="${s.id}">
      <h1>${s.title}</h1>
      ${s.bodyHtml}
    </section>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  :root { --ink:#1a1a1a; --muted:#666; --accent:#2563c4; --line:#e2e2e2; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: "Inter", -apple-system, sans-serif; color: var(--ink); font-size: 10.75pt; line-height: 1.5; }

  @page { size: Letter; margin: 19mm 17mm; }
  @page cover { margin: 0; }
  @page { @bottom-center { content: counter(page); font-family: "Inter", sans-serif; font-size: 9pt; color: #aaa; } }

  h1, h2, h3 { font-family: "Space Grotesk", sans-serif; color: #111; line-height: 1.2; }

  /* Cover */
  .cover { page: cover; break-after: page; position: relative; height: 100vh; background: #0A0A0A; color: #F5F5F5;
    display: flex; flex-direction: column; justify-content: center; padding: 28mm 24mm;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cover .title { font-family: "Space Grotesk", sans-serif; font-weight: 700; font-size: 34pt; line-height: 1.1; color: #F5F5F5; max-width: 150mm; }
  .cover .subtitle { font-family: "Space Grotesk", sans-serif; font-weight: 500; font-size: 16pt; color: #4FD1FF; margin-top: 10mm; }
  .cover .rule { width: 40mm; height: 2px; background: #3B9EFF; margin: 14mm 0 0; }
  .cover-logo { position: absolute; right: 24mm; bottom: 24mm; width: 48mm; height: auto; }

  /* Table of contents */
  .toc { break-after: page; padding-top: 6mm; }
  .toc h2 { font-size: 22pt; margin: 0 0 10mm; }
  .toc ol { list-style: none; margin: 0; padding: 0; counter-reset: toc; }
  .toc li { display: flex; align-items: baseline; margin: 0 0 6mm; counter-increment: toc; }
  .toc .toc-title { font-family: "Space Grotesk", sans-serif; font-weight: 500; font-size: 12.5pt; }
  .toc .toc-title::before { content: counter(toc, decimal) ".  "; color: var(--accent); font-weight: 600; }
  .toc .toc-dots { flex: 1; }

  /* Chapters */
  .chapter { break-before: page; }
  .chapter h1 { font-size: 23pt; font-weight: 700; margin: 0 0 7mm; padding-bottom: 5mm; border-bottom: 2px solid var(--line); }
  .chapter h2 { font-size: 13pt; font-weight: 600; margin: 6mm 0 2mm; break-after: avoid; }
  .chapter h3 { font-size: 11.5pt; font-weight: 600; margin: 5mm 0 1.5mm; break-after: avoid; }
  .chapter p { margin: 0 0 2.6mm; }
  .chapter ul, .chapter ol { margin: 0 0 3.5mm; padding-left: 6mm; }
  .chapter li { margin: 0 0 1.5mm; }
  .chapter blockquote { margin: 4mm 0; padding: 2mm 6mm; border-left: 3px solid var(--accent); color: #333; font-style: italic; }
  .chapter strong { font-weight: 600; color: #000; }
  .chapter p, .chapter li { orphans: 2; widows: 2; }
</style>
</head>
<body>
  <div class="cover">
    <div class="cover-main">
      <div class="title">${TITLE}</div>
      <div class="subtitle">${SUBTITLE}</div>
      <div class="rule"></div>
    </div>
    <img class="cover-logo" src="${logoDataUri}" alt="Silicon Tundra">
  </div>

  <div class="toc">
    <h2>Contents</h2>
    <ol>${toc}</ol>
  </div>

  ${body}
</body>
</html>`;

const htmlPath = path.join(root, "content/ebook/.build.html");
fs.writeFileSync(htmlPath, html);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`, {
  waitUntil: "networkidle0",
});
await page.pdf({
  path: outPath,
  format: "Letter",
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: false,
});
await browser.close();
if (!process.env.KEEP_HTML) fs.unlinkSync(htmlPath);

const kb = Math.round(fs.statSync(outPath).size / 1024);
console.log(`Wrote ${outPath} (${kb} KB), ${sections.length} sections.`);
