/**
 * env.js — Must be the FIRST import in server.js.
 *
 * In ES module projects ("type": "module"), `import` statements are
 * statically hoisted and resolved before any code in the importing file
 * runs. This means a `dotenv.config()` call placed after the imports
 * in server.js is already too late — all downstream config modules
 * (e.g. gemini.js) will have already read process.env while it was
 * still empty.
 *
 * Placing dotenv.config() here and importing this module first ensures
 * environment variables are populated before any other module executes.
 */

import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve the .env file relative to the project root (two levels up from src/config/)
const envPath = resolve(__dirname, '../../.env');

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('[env.js] Failed to load .env file:', result.error.message);
} else {
  console.log('[env.js] .env loaded from:', envPath);
}
