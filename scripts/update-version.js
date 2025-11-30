#!/usr/bin/env node
/**
 * Version Update Script for Asagiri CSS Framework
 *
 * Usage:
 *   node scripts/update-version.js [patch|minor|major|x.x.x]
 *
 * Examples:
 *   node scripts/update-version.js patch    # 2.0.0 -> 2.0.1
 *   node scripts/update-version.js minor    # 2.0.0 -> 2.1.0
 *   node scripts/update-version.js major    # 2.0.0 -> 3.0.0
 *   node scripts/update-version.js 2.1.0    # Set specific version
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");

// Files that need version updates
const VERSION_FILES = [
  {
    path: "package.json",
    patterns: [{ regex: /"version":\s*"[\d.]+"/, replace: (v) => `"version": "${v}"` }],
  },
  {
    path: "README.md",
    patterns: [
      // Version badge
      {
        regex: /img\.shields\.io\/badge\/version-[\d.]+-/,
        replace: (v) => `img.shields.io/badge/version-${v}-`,
      },
      // CDN links with @version
      {
        regex: /asagiri@[\d.]+\//g,
        replace: (v) => `asagiri@${v}/`,
      },
      // Text mentions like "v2.0" or "v2.1.0"
      {
        regex: /Asagiri v[\d.]+/g,
        replace: (v) => `Asagiri v${v}`,
      },
    ],
  },
  {
    path: "index.html",
    patterns: [
      // Title tag
      {
        regex: /<title>Asagiri v[\d.]+/,
        replace: (v) => `<title>Asagiri v${v}`,
      },
      // CDN links
      {
        regex: /asagiri@[\d.]+\//g,
        replace: (v) => `asagiri@${v}/`,
      },
    ],
  },
  {
    path: "index.d.ts",
    patterns: [
      {
        regex: /\* Asagiri CSS Framework v[\d.]+/,
        replace: (v) => `* Asagiri CSS Framework v${v}`,
      },
    ],
  },
  {
    path: "DARK_MODE.md",
    patterns: [
      {
        regex: /asagiri@[\d.]+\//g,
        replace: (v) => `asagiri@${v}/`,
      },
    ],
  },
  {
    path: "docs/getting-started.html",
    patterns: [
      // CDN links
      {
        regex: /asagiri@[\d.]+\//g,
        replace: (v) => `asagiri@${v}/`,
      },
      // Title mentions
      {
        regex: /Asagiri v[\d.]+/g,
        replace: (v) => `Asagiri v${v}`,
      },
    ],
  },
];

// Parse version string
function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}

// Get current version from package.json
function getCurrentVersion() {
  const pkgPath = path.join(ROOT_DIR, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  return pkg.version;
}

// Calculate new version
function getNewVersion(current, bump) {
  // If specific version provided
  if (/^\d+\.\d+\.\d+$/.test(bump)) {
    return bump;
  }

  const parsed = parseVersion(current);
  if (!parsed) {
    throw new Error(`Invalid current version: ${current}`);
  }

  switch (bump) {
    case "major":
      return `${parsed.major + 1}.0.0`;
    case "minor":
      return `${parsed.major}.${parsed.minor + 1}.0`;
    case "patch":
      return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
    default:
      throw new Error(`Invalid bump type: ${bump}. Use: patch, minor, major, or x.x.x`);
  }
}

// Update version in a file
function updateFile(fileConfig, newVersion) {
  const filePath = path.join(ROOT_DIR, fileConfig.path);

  if (!fs.existsSync(filePath)) {
    console.log(`  [SKIP] ${fileConfig.path} (file not found)`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  for (const pattern of fileConfig.patterns) {
    const newContent = content.replace(pattern.regex, pattern.replace(newVersion));
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  [OK] ${fileConfig.path}`);
    return true;
  } else {
    console.log(`  [UNCHANGED] ${fileConfig.path}`);
    return false;
  }
}

// Update CHANGELOG.md
function updateChangelog(newVersion, currentVersion) {
  const changelogPath = path.join(ROOT_DIR, "CHANGELOG.md");
  const today = new Date().toISOString().split("T")[0];

  if (!fs.existsSync(changelogPath)) {
    // Create new CHANGELOG
    const content = `# Changelog

All notable changes to Asagiri CSS Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [${newVersion}] - ${today}

### Changed
- Version bump from ${currentVersion}

## [${currentVersion}] - Initial Release

### Added
- Initial release of Asagiri CSS Framework
- Modern CSS Grid layout system
- Fluid typography with clamp()
- Comprehensive utility classes
- Dark mode support
- 600+ TypeScript type definitions
`;
    fs.writeFileSync(changelogPath, content, "utf8");
    console.log(`  [CREATED] CHANGELOG.md`);
    return;
  }

  // Prepend new version entry
  let content = fs.readFileSync(changelogPath, "utf8");
  const newEntry = `## [${newVersion}] - ${today}

### Changed
- Version bump from ${currentVersion}

`;

  // Insert after the header section
  const insertPoint = content.indexOf("\n## [");
  if (insertPoint !== -1) {
    content = content.slice(0, insertPoint) + "\n" + newEntry + content.slice(insertPoint + 1);
  } else {
    // No existing versions, append
    content += "\n" + newEntry;
  }

  fs.writeFileSync(changelogPath, content, "utf8");
  console.log(`  [UPDATED] CHANGELOG.md`);
}

// Main function
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
Asagiri Version Update Script

Usage:
  node scripts/update-version.js [patch|minor|major|x.x.x]

Options:
  patch   Increment patch version (2.0.0 -> 2.0.1)
  minor   Increment minor version (2.0.0 -> 2.1.0)
  major   Increment major version (2.0.0 -> 3.0.0)
  x.x.x   Set specific version

Examples:
  node scripts/update-version.js patch
  node scripts/update-version.js 2.1.0
`);
    process.exit(0);
  }

  const bump = args[0];
  const currentVersion = getCurrentVersion();
  const newVersion = getNewVersion(currentVersion, bump);

  console.log(`\nAsagiri Version Update`);
  console.log(`======================`);
  console.log(`Current: ${currentVersion}`);
  console.log(`New:     ${newVersion}\n`);

  console.log(`Updating files:`);

  let updatedCount = 0;
  for (const fileConfig of VERSION_FILES) {
    if (updateFile(fileConfig, newVersion)) {
      updatedCount++;
    }
  }

  // Update CHANGELOG
  updateChangelog(newVersion, currentVersion);

  console.log(`\nDone! Updated ${updatedCount} files.`);
  console.log(`\nNext steps:`);
  console.log(`  1. Review changes: git diff`);
  console.log(`  2. Build: npm run build && npm run build:compressed`);
  console.log(`  3. Commit: git add . && git commit -m "chore: bump version to ${newVersion}"`);
  console.log(`  4. Tag: git tag v${newVersion}`);
  console.log(`  5. Push: git push origin main --tags`);
  console.log(`  6. Publish: npm publish`);
}

main();
