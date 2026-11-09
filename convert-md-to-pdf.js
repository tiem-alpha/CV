#!/usr/bin/env node
/*
 * Convert a Markdown document to a print-ready PDF using Google Chrome.
 * Usage: node convert-md-to-pdf.js input.md [output.pdf]
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const input = process.argv[2];
if (!input) {
  console.error('Usage: node convert-md-to-pdf.js input.md [output.pdf]');
  process.exit(1);
}

const inputPath = path.resolve(input);
if (!fs.existsSync(inputPath)) throw new Error(`Không tìm thấy file: ${inputPath}`);
const outputPath = path.resolve(process.argv[3] || inputPath.replace(/\.md$/i, '') + '.pdf');
const chrome = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].find(candidate => candidate && fs.existsSync(candidate));
if (!chrome) throw new Error('Không tìm thấy Chrome/Edge. Hãy cài Google Chrome hoặc đặt biến CHROME_PATH.');

const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
function inline(text) {
  let html = escapeHtml(text)
    .replace(/&nbsp;/g, ' ')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
  // Make plain email addresses and web addresses clickable in the generated PDF.
  // The negative look-behind keeps explicit Markdown links above untouched.
  html = html
    .replace(/(?<!["=/>])\b(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>')
    .replace(/(?<![\w":=/>])([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi, '<a href="mailto:$1">$1</a>');
  return html;
}
function cells(line) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map(cell => inline(cell.trim()));
}
function isSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}
function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const output = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (/^\s*\|/.test(line) && index + 1 < lines.length && isSeparator(lines[index + 1])) {
      const headers = cells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && /^\s*\|/.test(lines[index])) rows.push(cells(lines[index++]));
      output.push(`<table><thead><tr>${headers.map(cell => `<th>${cell}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }
    if (/^---+\s*$/.test(line)) { output.push('<hr>'); index++; continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) { const level = heading[1].length; output.push(`<h${level}>${inline(heading[2])}</h${level}>`); index++; continue; }
    const quote = line.match(/^>\s?(.*)$/);
    if (quote) { output.push(`<blockquote>${inline(quote[1])}</blockquote>`); index++; continue; }
    if (/^[-*+]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^[-*+]\s+/.test(lines[index])) items.push(`<li>${inline(lines[index++].replace(/^[-*+]\s+/, ''))}</li>`);
      output.push(`<ul>${items.join('')}</ul>`); continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) items.push(`<li>${inline(lines[index++].replace(/^\d+\.\s+/, ''))}</li>`);
      output.push(`<ol>${items.join('')}</ol>`); continue;
    }
    if (!line.trim()) { index++; continue; }
    const paragraph = [];
    while (index < lines.length && lines[index].trim() && !/^(#{1,6})\s+|^>\s?|^[-*+]\s+|^\d+\.\s+|^---+\s*$|^\s*\|/.test(lines[index])) paragraph.push(lines[index++]);
    output.push(`<p>${paragraph.map(inline).join('<br>')}</p>`);
  }
  return output.join('\n');
}

const body = markdownToHtml(fs.readFileSync(inputPath, 'utf8'));
const documentTitle = escapeHtml(path.basename(inputPath, path.extname(inputPath)));
const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>${documentTitle}</title><style>
@page { size: A4; margin: 16mm 16mm 17mm; }
* { box-sizing: border-box; }
html, body { font-family: "Times New Roman", Times, serif; font-size: 13pt; line-height: 1.28; color: #111; }
body { margin: 0; text-align: justify; hyphens: auto; }
h1, h2, h3, h4, h5, h6 { margin: 0.8em 0 0.35em; line-height: 1.15; text-align: left; break-after: avoid-page; page-break-after: avoid; }
h1 { font-size: 22pt; } h2 { font-size: 16pt; border-bottom: 0.7pt solid #555; padding-bottom: 2pt; } h3 { font-size: 14pt; } h4 { font-size: 13pt; }
p { margin: 0.3em 0 0.55em; orphans: 3; widows: 3; }
ul, ol { margin: 0.25em 0 0.65em; padding-left: 1.35em; } li { margin: 0.16em 0; break-inside: avoid-page; page-break-inside: avoid; }
blockquote { margin: 0.45em 0; padding: 0.05em 0 0.05em 0.7em; border-left: 2pt solid #777; }
hr { border: 0; border-top: 0.7pt solid #888; margin: 0.7em 0; }
table { width: 100%; border-collapse: collapse; margin: 0.45em 0 0.75em; font-size: 13pt; table-layout: auto; break-inside: avoid-page; page-break-inside: avoid; }
thead { display: table-header-group; } tr { break-inside: avoid-page; page-break-inside: avoid; } th, td { border: 0.5pt solid #666; padding: 4pt 5pt; vertical-align: top; overflow-wrap: break-word; word-break: normal; } th { background: #eaeaea; text-align: left; } td:first-child { font-weight: normal; }
code { font-family: "Courier New", monospace; font-size: 11pt; } a { color: inherit; text-decoration: none; }
@media print { h1, h2, h3 { break-after: avoid-page; } }
</style></head><body>${body}</body></html>`;

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'md-to-pdf-'));
const htmlPath = path.join(tempDir, 'document.html');
try {
  fs.writeFileSync(htmlPath, html, 'utf8');
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${outputPath}`, pathToFileURL(htmlPath)], { stdio: 'inherit' });
  if (!fs.existsSync(outputPath)) throw new Error('Chrome không tạo được file PDF.');
  console.log(`Đã tạo PDF: ${outputPath}`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
function pathToFileURL(filePath) {
  return 'file:///' + filePath.replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/');
}
