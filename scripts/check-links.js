#!/usr/bin/env node
/**
 * Check for broken links in HTML files
 * Validates internal links and detects 404s
 */

const fs = require('fs');
const path = require('path');

let hasErrors = false;
let checkedLinks = new Set();

console.log('🔗 Checking internal links in HTML files...\n');

/**
 * Recursively find all HTML files
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!['node_modules', 'storybook-static', '.storybook', '.git', '.husky'].includes(file)) {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const htmlFiles = findHtmlFiles('.');

htmlFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip code examples
    if (line.includes('<code>') || line.includes('<pre>') || line.includes('&lt;')) {
      return;
    }

    // Find all href attributes
    const hrefMatches = line.matchAll(/href=["']([^"']+)["']/g);

    for (const match of hrefMatches) {
      const href = match[1];

      // Skip external URLs, mailto, tel, anchors
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        href.startsWith('javascript:')
      ) {
        continue;
      }

      // Create unique key for this link check
      const checkKey = `${file}::${href}`;
      if (checkedLinks.has(checkKey)) {
        continue;
      }
      checkedLinks.add(checkKey);

      // Resolve path
      const htmlDir = path.dirname(file);
      const targetPath = path.join(htmlDir, href.split('#')[0]); // Remove anchor

      // Check if target exists
      if (!fs.existsSync(targetPath)) {
        console.error(`❌ ${file}:${index + 1}`);
        console.error(`   Broken link: ${href}`);
        console.error(`   Target not found: ${targetPath}\n`);
        hasErrors = true;
      }
    }
  });
});

console.log('='.repeat(50));
if (hasErrors) {
  console.error(`\n❌ Found broken links`);
  console.error(`   Fix the links above to prevent 404 errors.\n`);
  process.exit(1);
} else {
  console.log(`\n✅ All internal links are valid`);
  console.log(`   Checked ${checkedLinks.size} unique links in ${htmlFiles.length} files\n`);
  process.exit(0);
}
