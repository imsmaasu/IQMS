import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIELDS } from '../src/data/marriageFormFields.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outPath = path.join(rootDir, 'apps-script', 'Fields.gs');

export function buildFieldsGsContent(fields = FIELDS) {
  if (!Array.isArray(fields) || fields.length !== 150) {
    throw new Error(`Expected 150 fields, got ${Array.isArray(fields) ? fields.length : typeof fields}`);
  }

  const seenIds = new Set();
  const seenHeaders = new Set();

  const lines = fields.map((f) => {
    if (seenIds.has(f.id)) {
      throw new Error(`Duplicate field id detected: ${f.id}`);
    }
    seenIds.add(f.id);

    const header = f.part === 'personal' ? f.label : `Requirement: ${f.label}`;
    if (seenHeaders.has(header)) {
      throw new Error(`Duplicate sheet header detected: ${header}`);
    }
    seenHeaders.add(header);

    const entry = {
      id: f.id,
      part: f.part,
      header,
      label: f.label,
      type: f.type,
      required: Boolean(f.required),
      options: f.options ?? null,
      min: f.min ?? null,
      max: f.max ?? null,
      secret: Boolean(f.secret),
    };
    return ' ' + JSON.stringify(entry);
  });

  return (
    '// GENERATED from src/data/marriageFormFields.js by `npm run gen:apps-script`. Do not edit.\n' +
    'var FIELDS = [\n' +
    lines.join(',\n') +
    '\n];\n'
  );
}

// Run when invoked directly via CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const content = buildFieldsGsContent(FIELDS);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`Generated ${path.relative(rootDir, outPath)} (${FIELDS.length} fields).`);
}

