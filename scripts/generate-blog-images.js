import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../public/blog');
const accents = ['#8B5CF6', '#F472B6', '#FBBF24', '#34D399'];

const slugs = [
  'beliefs-that-keep-founders-stuck',
  'busy-hiding-real-problem',
  'coaching-pricing',
  'founder-dependency',
  'founder-role-transformation',
  'how-founder-dependency-happens',
  'not-burnout-structural-dependency',
  'psychological-obstacles-stepping-back',
  'role-clarity-founders',
  'sustainable-business-step-by-step',
  'sustainable-business-strategies',
  'thing-affecting-business-nobody-names',
  'trap-professionals-walk-into',
  'when-to-outsource-marketing',
  'why-unbound-ascent-coaching-works',
  'your-role-didnt-grow',
];

function createCoverSvg(accent, index) {
  const secondary = accents[(index + 1) % accents.length];
  const tertiary = accents[(index + 2) % accents.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-hidden="true">
  <rect width="1200" height="630" fill="#FFFDF5"/>
  <circle cx="1050" cy="90" r="120" fill="${accent}" opacity="0.18"/>
  <circle cx="140" cy="520" r="160" fill="${secondary}" opacity="0.14"/>
  <rect x="780" y="360" width="180" height="180" rx="36" fill="${tertiary}" opacity="0.22" transform="rotate(12 870 450)"/>
  <rect x="90" y="120" width="220" height="220" rx="32" fill="${accent}" opacity="0.9"/>
  <rect x="320" y="210" width="560" height="12" rx="6" fill="#1E293B" opacity="0.12"/>
  <rect x="320" y="260" width="480" height="12" rx="6" fill="#1E293B" opacity="0.1"/>
  <rect x="320" y="310" width="520" height="12" rx="6" fill="#1E293B" opacity="0.08"/>
  <circle cx="980" cy="470" r="56" fill="${secondary}" opacity="0.85"/>
  <rect x="320" y="380" width="140" height="140" rx="28" fill="${tertiary}" opacity="0.75"/>
</svg>`;
}

fs.mkdirSync(outputDir, { recursive: true });

for (const [index, slug] of slugs.entries()) {
  const accent = accents[index % accents.length];
  fs.writeFileSync(
    path.join(outputDir, `${slug}.svg`),
    createCoverSvg(accent, index),
  );
}

console.log(`Generated ${slugs.length} blog cover images in public/blog/`);
