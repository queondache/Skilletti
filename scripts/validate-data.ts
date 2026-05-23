#!/usr/bin/env tsx
/**
 * Valida data/skills.json contro data/skills.schema.json.
 *
 * Comportamento:
 * - skills.json mancante → exit 0 (skill catalog ancora vuoto, ok pre-seed)
 * - skills.json esiste ma invalido → exit 1, errori formattati
 * - skills.json valido → exit 0, log riassuntivo
 *
 * Eseguito da:
 *  - `pnpm validate:data` (manuale)
 *  - `pnpm prebuild` (automatico, fallisce build se invalido)
 *  - pre-commit hook via simple-git-hooks
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020, { type ErrorObject } from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SCHEMA_PATH = resolve(ROOT, 'data/skills.schema.json');
const DATA_PATH = resolve(ROOT, 'data/skills.json');

function fail(msg: string, details?: unknown): never {
  // Errori sempre loggati con contesto (convenzione globale)
  console.error(`✗ validate-data: ${msg}`);
  if (details) console.error(details);
  process.exit(1);
}

function info(msg: string) {
  console.log(`✓ validate-data: ${msg}`);
}

function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors?.length) return '(no details)';
  return errors
    .map((e, i) => {
      const path = e.instancePath || '(root)';
      const params = JSON.stringify(e.params);
      return `  ${i + 1}. ${path} — ${e.message ?? 'invalid'}  ${params}`;
    })
    .join('\n');
}

function main() {
  // Carica schema
  if (!existsSync(SCHEMA_PATH)) fail(`schema missing at ${SCHEMA_PATH}`);
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8'));

  // Skills assente è ok pre-seed
  if (!existsSync(DATA_PATH)) {
    info('data/skills.json missing — skipping (pre-seed state)');
    process.exit(0);
  }

  // Parse data
  let data: unknown;
  try {
    data = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  } catch (err) {
    fail(`data/skills.json is not valid JSON`, err);
  }

  // Setup Ajv
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const ok = validate(data);

  if (!ok) {
    console.error(`\n✗ skills.json fails schema validation:\n`);
    console.error(formatErrors(validate.errors));
    console.error('');
    process.exit(1);
  }

  // Vincoli extra non esprimibili in schema
  const items = data as Array<Record<string, unknown>>;

  // Tetto rigido 30 schede (anche schema lo fa via maxItems, ridondante = ok)
  if (items.length > 30) {
    fail(`30 skill cap exceeded: found ${items.length}`);
  }

  // Id duplicati
  const ids = new Set<string>();
  for (const skill of items) {
    const id = skill.id as string;
    if (ids.has(id)) fail(`duplicate id: '${id}'`);
    ids.add(id);
  }

  // repo_url duplicati
  const urls = new Set<string>();
  for (const skill of items) {
    const url = (skill.repo_url as string).toLowerCase();
    if (urls.has(url)) fail(`duplicate repo_url: '${url}'`);
    urls.add(url);
  }

  info(`${items.length} skill validate (max 30)`);
  process.exit(0);
}

main();
