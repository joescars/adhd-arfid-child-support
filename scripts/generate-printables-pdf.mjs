import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { marked } from 'marked';

const root = resolve(import.meta.dirname, '..');
const sourcePath = join(root, 'docs/tools/printable-parent-worksheets.md');
const outputPath = join(root, 'public/downloads/parent-worksheets.pdf');
const chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const markdown = await readFile(sourcePath, 'utf8');
const worksheetMarkdown = markdown;
const contentHtml = marked.parse(worksheetMarkdown);
const tempDir = await mkdtemp(join(tmpdir(), 'adhd-arfid-printables-'));
const htmlPath = join(tempDir, 'parent-worksheets.html');
const pdfPath = join(tempDir, 'parent-worksheets.pdf');
const outputHtml = contentHtml
  .replace(/<h1>/, '<div class="intro"><strong>Caregiver worksheets</strong> · Optional tools to prepare for care conversations. These do not diagnose, score intake, or replace individualized clinical guidance.</div><h1>')
  .replace('<h2>Appointment preparation</h2>', '<div class="sheet">\n<h2>Appointment preparation</h2>')
  .replace('<h2>Short observation log</h2>', '</div><div class="sheet">\n<h2>Short observation log</h2>')
  .replace('<h2>School communication sheet</h2>', '</div><div class="sheet">\n<h2>School communication sheet</h2>')
  .replace('<h2>Provider-fit checklist</h2>', '</div><div class="sheet">\n<h2>Provider-fit checklist</h2>')
  .replace('<h2>Care coordination while waiting</h2>', '</div><div class="sheet care-coordination">\n<h2>Care coordination while waiting</h2>')
  .replace(/<p>(_{20,})<\/p>/g, '<div class="write-area"><span></span></div>')
  .replace('<h2>Sources</h2>', '<h2>Sources</h2>')
  .replace(/(\[[1-3]\])/g, ' $1');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Printable parent worksheets</title>
<style>
@page { size: letter; margin: 0.58in 0.62in 0.62in; }
:root { font-family: Arial, Helvetica, sans-serif; color: #202124; font-size: 10pt; line-height: 1.35; }
* { box-sizing: border-box; }
body { margin: 0; }
h1 { color: #174ea6; font-size: 23pt; line-height: 1.12; margin: 0 0 9pt; }
h2 { color: #174ea6; font-size: 15pt; line-height: 1.2; margin: 20pt 0 8pt; border-bottom: 1px solid #a8c7fa; padding-bottom: 4pt; break-after: avoid; }
p { margin: 6pt 0; }
ol, ul { padding-left: 32pt; margin: 7pt 0 10pt; }
li { padding-left: 5pt; margin: 7pt 0; }
ol li::marker, ul li::marker { color: #174ea6; font-weight: bold; }
table { width: 100%; border-collapse: collapse; font-size: 8pt; margin: 8pt 0; }
th, td { border: 1px solid #b9c1cc; padding: 5pt; text-align: left; vertical-align: top; height: 44pt; }
th { background: #e8f0fe; color: #174ea6; }
strong { color: #202124; }
a { color: #174ea6; text-decoration: none; }
h1, h2, p, li, table, tr { break-inside: avoid; }
.sheet { break-after: page; }
.sheet.care-coordination { break-after: auto; }
.care-coordination .write-area span { height: 0.3in; }
.write-area { display: grid; gap: 9pt; margin: 0 0 10pt; }
.write-area span { border-bottom: 1px solid #9aa0a6; height: 0.22in; }
.sheet > p:not(.footer) { margin: 10pt 0; }
.sheet h2 { margin-top: 15pt; }
.sheet p:has(+ p > em) { margin-bottom: 16pt; }
.intro { background: #f2f6fc; border-left: 3px solid #174ea6; padding: 9pt 11pt; margin-bottom: 12pt; }
.privacy { background: #f8f9fa; border: 1px solid #dfe1e5; padding: 8pt 10pt; margin-top: 12pt; }
</style>
</head>
<body>
${outputHtml}
</body>
</html>`;

if (!await readFile(chromePath).then(() => true).catch(() => false)) {
  throw new Error(`Chrome executable not found at ${chromePath}. Set CHROME_PATH to a local Chrome/Chromium binary.`);
}

try {
  await writeFile(htmlPath, html);
  const proc = spawnSync(chromePath, [
    '--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--disable-extensions', '--disable-background-networking', `--user-data-dir=${join(tempDir, 'chrome-profile')}`, `--print-to-pdf=${pdfPath}`,
    '--no-pdf-header-footer', pathToFileURL(htmlPath).href,
  ], { encoding: 'utf8', timeout: 60_000 });
  if (proc.error) throw proc.error;
  if (proc.status !== 0) {
    throw new Error(`Chrome PDF export failed (${proc.status}): ${proc.stderr}`);
  }
  const pdf = await readFile(pdfPath);
  if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error('Chrome output is not a PDF file');
  await mkdir(join(root, 'public/downloads'), { recursive: true });
  await writeFile(outputPath, pdf);
  const metadata = spawnSync('pdfinfo', [outputPath], { encoding: 'utf8', timeout: 10_000 });
  if (metadata.status !== 0) throw new Error(`Could not validate PDF metadata: ${metadata.stderr}`);
  console.log(`Created ${outputPath} (${pdf.length} bytes)`);
  console.log(metadata.stdout.split('\n').filter((line) => /^(Pages|Page size|File size|PDF version):/.test(line)).join('\n'));
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
