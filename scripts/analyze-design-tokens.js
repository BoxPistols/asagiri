#!/usr/bin/env node

/**
 * Design Token Analyzer
 * Extracts and documents all CSS custom properties (design tokens) from SCSS files
 * Detects inline styles in HTML files
 * Generates comprehensive documentation
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

class DesignTokenAnalyzer {
  constructor() {
    this.tokens = {
      colors: [],
      spacing: [],
      typography: [],
      borders: [],
      shadows: [],
      other: [],
    };
    this.inlineStyles = [];
    this.stats = {
      totalTokens: 0,
      totalFiles: 0,
      inlineStylesFound: 0,
    };
  }

  /**
   * Read SCSS file and extract CSS custom properties
   */
  extractTokensFromSCSS(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Match CSS custom properties: --variable-name: value;
      const match = line.match(/^\s*(--[\w-]+):\s*([^;]+);/);

      if (match) {
        const [, name, value] = match;
        const token = {
          name,
          value: value.trim(),
          file: path.basename(filePath),
          line: index + 1,
        };

        // Categorize token
        if (name.includes('color')) {
          this.tokens.colors.push(token);
        } else if (name.includes('spacing') || name.match(/^--(m|p|gap)-/)) {
          this.tokens.spacing.push(token);
        } else if (name.match(/^--(font|line-height|letter-spacing)/)) {
          this.tokens.typography.push(token);
        } else if (name.includes('border') || name.includes('radius')) {
          this.tokens.borders.push(token);
        } else if (name.includes('shadow')) {
          this.tokens.shadows.push(token);
        } else {
          this.tokens.other.push(token);
        }

        this.stats.totalTokens++;
      }
    });
  }

  /**
   * Scan HTML files for inline styles
   */
  detectInlineStyles(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Detect style attribute
      const styleMatch = line.match(/style=["']([^"']+)["']/g);

      if (styleMatch) {
        styleMatch.forEach((match) => {
          // Extract the style content
          const styleContent = match.match(/style=["']([^"']+)["']/)[1];

          // Ignore safe patterns (margin-top, display:flex, etc. are OK in limited cases)
          // Flag complex inline styles
          if (styleContent.split(';').length > 2 ||
              styleContent.includes('background:') ||
              styleContent.includes('color:')) {

            this.inlineStyles.push({
              file: path.relative(process.cwd(), filePath),
              line: index + 1,
              style: styleContent,
            });
            this.stats.inlineStylesFound++;
          }
        });
      }
    });
  }

  /**
   * Recursively scan directory
   */
  scanDirectory(dir, extensions, callback) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        this.scanDirectory(filePath, extensions, callback);
      } else if (extensions.some((ext) => file.endsWith(ext))) {
        callback(filePath);
        this.stats.totalFiles++;
      }
    });
  }

  /**
   * Generate Markdown documentation
   */
  generateMarkdown() {
    let md = '# Asagiri Design Tokens Documentation\n\n';
    md += `Generated: ${new Date().toISOString()}\n\n`;
    md += '## Summary\n\n';
    md += `- **Total Tokens**: ${this.stats.totalTokens}\n`;
    md += `- **Files Scanned**: ${this.stats.totalFiles}\n`;
    md += `- **Inline Styles Found**: ${this.stats.inlineStylesFound}\n\n`;

    md += '---\n\n';

    // Color Tokens
    if (this.tokens.colors.length > 0) {
      md += '## 🎨 Color Tokens\n\n';
      md += '| Token Name | Value | File | Line |\n';
      md += '|------------|-------|------|------|\n';
      this.tokens.colors.forEach((token) => {
        md += `| \`${token.name}\` | ${token.value} | ${token.file} | ${token.line} |\n`;
      });
      md += '\n';
    }

    // Spacing Tokens
    if (this.tokens.spacing.length > 0) {
      md += '## 📏 Spacing Tokens\n\n';
      md += '| Token Name | Value | File | Line |\n';
      md += '|------------|-------|------|------|\n';
      this.tokens.spacing.forEach((token) => {
        md += `| \`${token.name}\` | ${token.value} | ${token.file} | ${token.line} |\n`;
      });
      md += '\n';
    }

    // Typography Tokens
    if (this.tokens.typography.length > 0) {
      md += '## 📝 Typography Tokens\n\n';
      md += '| Token Name | Value | File | Line |\n';
      md += '|------------|-------|------|------|\n';
      this.tokens.typography.forEach((token) => {
        md += `| \`${token.name}\` | ${token.value} | ${token.file} | ${token.line} |\n`;
      });
      md += '\n';
    }

    // Border Tokens
    if (this.tokens.borders.length > 0) {
      md += '## 🔲 Border & Radius Tokens\n\n';
      md += '| Token Name | Value | File | Line |\n';
      md += '|------------|-------|------|------|\n';
      this.tokens.borders.forEach((token) => {
        md += `| \`${token.name}\` | ${token.value} | ${token.file} | ${token.line} |\n`;
      });
      md += '\n';
    }

    // Shadow Tokens
    if (this.tokens.shadows.length > 0) {
      md += '## 🌑 Shadow Tokens\n\n';
      md += '| Token Name | Value | File | Line |\n';
      md += '|------------|-------|------|------|\n';
      this.tokens.shadows.forEach((token) => {
        md += `| \`${token.name}\` | ${token.value} | ${token.file} | ${token.line} |\n`;
      });
      md += '\n';
    }

    // Other Tokens
    if (this.tokens.other.length > 0) {
      md += '## 🔧 Other Tokens\n\n';
      md += '| Token Name | Value | File | Line |\n';
      md += '|------------|-------|------|------|\n';
      this.tokens.other.forEach((token) => {
        md += `| \`${token.name}\` | ${token.value} | ${token.file} | ${token.line} |\n`;
      });
      md += '\n';
    }

    // Inline Styles Report
    if (this.inlineStyles.length > 0) {
      md += '## ⚠️ Inline Styles Detected\n\n';
      md += '**These should be converted to CSS classes or design tokens:**\n\n';
      md += '| File | Line | Inline Style |\n';
      md += '|------|------|-------------|\n';
      this.inlineStyles.forEach((item) => {
        md += `| ${item.file} | ${item.line} | \`${item.style}\` |\n`;
      });
      md += '\n';
    } else {
      md += '## ✅ No Problematic Inline Styles\n\n';
      md += 'All styles are properly abstracted!\n\n';
    }

    // Recommendations
    md += '## 📋 Recommendations\n\n';
    md += '### Best Practices\n\n';
    md += '1. **Use Design Tokens**: Always use CSS custom properties instead of hardcoded values\n';
    md += '2. **Avoid Inline Styles**: Move inline styles to CSS classes\n';
    md += '3. **Maintain Consistency**: Reuse existing tokens before creating new ones\n';
    md += '4. **Document New Tokens**: Add comments explaining the purpose of new tokens\n';
    md += '5. **Test Dark Mode**: Ensure all tokens work in both light and dark themes\n\n';

    md += '### Token Naming Convention\n\n';
    md += '```\n';
    md += '--category-property-variant-state\n';
    md += '\n';
    md += 'Examples:\n';
    md += '--color-primary           (category: color, property: primary)\n';
    md += '--color-text-muted        (category: color, property: text, variant: muted)\n';
    md += '--spacing-4              (category: spacing, property: 4 = 1rem)\n';
    md += '--font-size-lg           (category: font, property: size, variant: lg)\n';
    md += '```\n\n';

    return md;
  }

  /**
   * Run the analysis
   */
  run() {
    console.log(`${colors.bright}${colors.blue}🔍 Asagiri Design Token Analyzer${colors.reset}\n`);

    // Analyze SCSS files
    console.log(`${colors.cyan}Scanning SCSS files...${colors.reset}`);
    this.scanDirectory(
      path.join(process.cwd(), 'scss'),
      ['.scss'],
      (filePath) => this.extractTokensFromSCSS(filePath)
    );

    // Detect inline styles in HTML
    console.log(`${colors.cyan}Scanning HTML files for inline styles...${colors.reset}`);
    ['docs', 'examples'].forEach((dir) => {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        this.scanDirectory(
          dirPath,
          ['.html'],
          (filePath) => this.detectInlineStyles(filePath)
        );
      }
    });

    // Generate report
    console.log(`\n${colors.bright}📊 Analysis Results:${colors.reset}`);
    console.log(`${colors.green}✓ Total Design Tokens: ${this.stats.totalTokens}${colors.reset}`);
    console.log(`${colors.green}✓ Files Scanned: ${this.stats.totalFiles}${colors.reset}`);

    if (this.stats.inlineStylesFound > 0) {
      console.log(`${colors.yellow}⚠ Inline Styles Found: ${this.stats.inlineStylesFound}${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ No problematic inline styles found!${colors.reset}`);
    }

    // Write documentation
    const markdown = this.generateMarkdown();
    const outputPath = path.join(process.cwd(), 'docs/design-tokens.md');
    fs.writeFileSync(outputPath, markdown);

    console.log(`\n${colors.bright}${colors.green}✓ Documentation generated: ${outputPath}${colors.reset}\n`);

    // Return exit code based on issues found
    return this.stats.inlineStylesFound > 0 ? 1 : 0;
  }
}

// Run analyzer
const analyzer = new DesignTokenAnalyzer();
const exitCode = analyzer.run();
process.exit(exitCode);
