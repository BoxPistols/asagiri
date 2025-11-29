/**
 * Generate Apple Touch Icons from SVG favicon
 * Creates PNG icons in multiple sizes for iOS devices
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { size: 180, name: 'apple-touch-icon.png' },           // iPhone Retina
  { size: 152, name: 'apple-touch-icon-152x152.png' },   // iPad
  { size: 120, name: 'apple-touch-icon-120x120.png' },   // iPhone
  { size: 76, name: 'apple-touch-icon-76x76.png' },      // iPad non-Retina
];

const svgPath = path.join(__dirname, '..', 'favicon.svg');
const outputDir = path.join(__dirname, '..');

async function generateIcons() {
  console.log('Generating Apple Touch Icons...');

  const svgBuffer = fs.readFileSync(svgPath);

  for (const { size, name } of sizes) {
    const outputPath = path.join(outputDir, name);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`Created: ${name} (${size}x${size})`);
  }

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
