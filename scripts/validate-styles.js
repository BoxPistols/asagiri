#!/usr/bin/env node
/**
 * Validate CSS paths in all HTML files
 * Prevents pages from loading with broken styles
 */

const fs = require('fs');
const path = require('path');

const INVALID_PATTERNS = [
  /dist\/asagiri\.min\.css/,
  /dist\/asagiri\.css/,
];

let hasErrors = false;
let warningCount = 0;
let checkedCount = 0;

console.log('🔍 Validating CSS paths in HTML files...\n');

/**
 * Recursively find all HTML files
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and other build directories
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

  // Check for stylesheet links
  const stylesheetLines = lines
    .map((line, index) => ({ line, index: index + 1 }))
    .filter(({ line }) => line.includes('rel="stylesheet"'));

  if (stylesheetLines.length === 0) {
    // Skip redirect pages and minimal HTML files
    if (file.includes('/guides/') && file.endsWith('.html') && content.includes('meta http-equiv="refresh"')) {
      return; // Redirect page, no stylesheet needed
    }
    if (file.includes('api-reference.html') || file.includes('getting-started.html')) {
      if (content.includes('meta http-equiv="refresh"')) {
        return; // Redirect page
      }
    }
    console.warn(`⚠️  ${file}: No stylesheet found`);
    warningCount++;
    return;
  }

  stylesheetLines.forEach(({ line, index }) => {
    // Skip code examples (inside <code> or <pre> tags)
    if (line.includes('<code>') || line.includes('<pre>') || line.includes('&lt;')) {
      return; // This is example code, not actual stylesheet link
    }

    // Check for invalid patterns
    INVALID_PATTERNS.forEach((pattern) => {
      if (pattern.test(line)) {
        console.error(`❌ ${file}:${index}`);
        console.error(`   Invalid CSS path: ${line.trim()}`);
        console.error(`   This file does not exist or is in the wrong location.\n`);
        hasErrors = true;
      }
    });

    // Extract href value
    const hrefMatch = line.match(/href=["']([^"']+)["']/);
    if (hrefMatch) {
      const href = hrefMatch[1];

      // Skip external URLs
      if (href.startsWith('http')) {
        return;
      }

      // Resolve path relative to HTML file
      const htmlDir = path.dirname(file);
      const cssPath = path.join(htmlDir, href);

      // Check if CSS file exists
      if (!fs.existsSync(cssPath)) {
        console.error(`❌ ${file}:${index}`);
        console.error(`   CSS file not found: ${href}`);
        console.error(`   Resolved path: ${cssPath}\n`);
        hasErrors = true;
      } else {
        console.log(`✅ ${file}: ${href}`);
        checkedCount++;
      }
    }
  });
});

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error(`\n❌ Validation failed with errors`);
  console.error(`   Fix the CSS paths above to ensure styles load correctly.\n`);
  process.exit(1);
} else if (warningCount > 0) {
  console.warn(`\n⚠️  Validation completed with ${warningCount} warnings`);
  console.log(`✅ Checked ${checkedCount} CSS links in ${htmlFiles.length} files\n`);
  process.exit(0);
} else {
  console.log(`\n✅ All CSS paths are valid`);
  console.log(`   Checked ${checkedCount} CSS links in ${htmlFiles.length} files\n`);
  process.exit(0);
}
