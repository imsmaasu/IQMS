import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIELDS } from '../src/data/marriageFormFields.js';
import { buildFieldsGsContent } from './gen-apps-script-fields.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'docs', 'form-fields-source.txt');
const fieldsGsPath = path.join(rootDir, 'apps-script', 'Fields.gs');

function parseSourceFile(text) {
  const lines = text.split(/\r?\n/);
  let currentPart = null;
  const parsed = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line === '[PERSONAL DETAIL INFORMATION]') {
      currentPart = 'personal';
      continue;
    }
    if (line === '[REQUIREMENTS]') {
      currentPart = 'requirements';
      continue;
    }

    const rowMatch = /^R(\d+)\s*\|\s*(.+)$/.exec(line);
    if (!rowMatch) {
      throw new Error(`Unexpected line in form-fields-source.txt: "${line}"`);
    }
    if (!currentPart) {
      throw new Error(`Row found before section header: "${line}"`);
    }

    const row = Number(rowMatch[1]);
    const cells = rowMatch[2].split('|').map((c) => c.trim());
    if (cells.length !== 3) {
      throw new Error(`Row R${row} expected 3 fields, found ${cells.length}: "${line}"`);
    }

    cells.forEach((cell, col) => {
      const tags = [];
      const label = cell
        .replace(/\{([^}]+)\}/g, (_, tag) => {
          tags.push(tag.trim());
          return '';
        })
        .replace(/\s+/g, ' ')
        .trim();

      let required = false;
      let secret = false;
      let type = 'text';
      let options = null;
      let min = null;
      let max = null;

      for (const tag of tags) {
        if (tag === 'req') {
          required = true;
        } else if (tag === 'secret') {
          secret = true;
        } else if (tag === 'date18') {
          type = 'date18';
        } else if (tag === 'time') {
          type = 'time';
        } else if (tag === 'tel') {
          type = 'tel';
        } else if (tag === 'email') {
          type = 'email';
        } else if (tag === 'long') {
          type = 'long';
        } else if (tag === 'yn') {
          type = 'yn';
          options = ['Yes', 'No'];
        } else if (tag === 'file image') {
          type = 'file';
        } else if (tag.startsWith('range')) {
          type = 'range';
        } else if (tag.startsWith('num')) {
          type = 'num';
          min = 0;
          if (tag === 'num 0-100') {
            max = 100;
          }
        } else if (tag.startsWith('sel:')) {
          type = 'sel';
          options = tag
            .slice(4)
            .split('/')
            .map((o) => o.trim());
        } else {
          throw new Error(`Unknown tag "{${tag}}" on R${row} col ${col}`);
        }
      }

      parsed.push({
        part: currentPart,
        row,
        col,
        label,
        type,
        required,
        options,
        min,
        max,
        secret,
      });
    });
  }

  return parsed;
}

function assert(cond, msg) {
  if (!cond) {
    console.error(`FAIL: ${msg}`);
    process.exit(1);
  }
}

const sourceText = fs.readFileSync(sourcePath, 'utf8');
const expected = parseSourceFile(sourceText);

assert(expected.length === 150, `Source file must have 150 fields, got ${expected.length}`);
assert(FIELDS.length === 150, `FIELDS must have 150 entries, got ${FIELDS.length}`);

const seenIds = new Set();
let requiredCount = 0;

for (let i = 0; i < 150; i++) {
  const exp = expected[i];
  const act = FIELDS[i];

  assert(act.part === exp.part, `Index ${i} part mismatch: expected ${exp.part}, got ${act.part}`);
  assert(act.row === exp.row, `Index ${i} row mismatch: expected ${exp.row}, got ${act.row}`);
  assert(act.col === exp.col, `Index ${i} col mismatch: expected ${exp.col}, got ${act.col}`);
  assert(act.label === exp.label, `Index ${i} label mismatch: expected "${exp.label}", got "${act.label}"`);
  assert(act.type === exp.type, `Index ${i} (${act.label}) type mismatch: expected ${exp.type}, got ${act.type}`);
  assert(act.required === exp.required, `Index ${i} (${act.label}) required mismatch: expected ${exp.required}, got ${act.required}`);
  assert(act.secret === exp.secret, `Index ${i} (${act.label}) secret mismatch: expected ${exp.secret}, got ${act.secret}`);
  assert(
    JSON.stringify(act.options) === JSON.stringify(exp.options),
    `Index ${i} (${act.label}) options mismatch`
  );
  assert(act.min === exp.min, `Index ${i} (${act.label}) min mismatch: expected ${exp.min}, got ${act.min}`);
  assert(act.max === exp.max, `Index ${i} (${act.label}) max mismatch: expected ${exp.max}, got ${act.max}`);

  const expectedPrefix = act.part === 'personal' ? 'p_' : 'r_';
  assert(act.id.startsWith(expectedPrefix), `Index ${i} id "${act.id}" must start with ${expectedPrefix}`);
  assert(!seenIds.has(act.id), `Duplicate id "${act.id}"`);
  seenIds.add(act.id);

  if (act.required) requiredCount++;
}

assert(requiredCount === 12, `Expected exactly 12 required fields, got ${requiredCount}`);

// Verify apps-script/Fields.gs is in sync with in-memory generation
assert(fs.existsSync(fieldsGsPath), `Missing generated file: ${fieldsGsPath}`);
const actualFieldsGs = fs.readFileSync(fieldsGsPath, 'utf8').replace(/\r\n/g, '\n');
const expectedFieldsGs = buildFieldsGsContent(FIELDS).replace(/\r\n/g, '\n');
assert(
  actualFieldsGs === expectedFieldsGs,
  'apps-script/Fields.gs is out of sync with src/data/marriageFormFields.js. Run: npm run gen:apps-script'
);

console.log('PASS: 150 fields verified (order, verbatim labels, types, 12 required, Fields.gs in sync).');

