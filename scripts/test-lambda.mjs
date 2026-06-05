/**
 * Test for all Lambda query types.
 * Usage: npm run test:lambda
 * Optional: BUS_ID=6 TARGET_TIME="2025-06-01 12:00:00" npm run test:lambda
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envText = readFileSync(join(root, '.env'), 'utf8');
// Strip optional quotes — Vite does this automatically; this script reads .env directly
const lambdaUrl = envText.match(/^VITE_LAMBDA_URL=(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');

if (!lambdaUrl) {
    console.error('Missing VITE_LAMBDA_URL in .env');
    process.exit(1);
}

const busId = process.env.BUS_ID ?? '6';
const targetTime =
    process.env.TARGET_TIME ??
    new Date().toISOString().slice(0, 19).replace('T', ' ');

const tests = [
    {
        name: 'latest_bus',
        params: { query: 'latest_bus', bus_id: busId, target_time: targetTime },
    },
    {
        name: 'bus_24h',
        params: { query: 'bus_24h', bus_id: busId, target_time: targetTime },
    },
    {
        name: 'latest_global',
        params: { query: 'latest_global', target_time: targetTime },
    },
    {
        name: 'last_outage',
        params: { query: 'last_outage', bus_id: busId, target_time: targetTime },
    },
];

console.log('Lambda URL:', lambdaUrl);
console.log('bus_id:', busId, '| target_time:', targetTime);
console.log('---');

let failed = 0;

for (const { name, params } of tests) {
    const url = `${lambdaUrl}?${new URLSearchParams(params)}`;
    try {
        const res = await fetch(url);
        const body = await res.json().catch(() => null);
        const ok = res.ok && body && Array.isArray(body.rows);

        if (!ok) {
            failed++;
            console.log(`FAIL ${name}  HTTP ${res.status}`);
            console.log(JSON.stringify(body, null, 2));
            continue;
        }

        console.log(`OK   ${name}  count=${body.count}`);
        if (body.count > 0) {
            console.log('     sample:', JSON.stringify(body.rows[0]));
        } else {
            console.log('     (no rows)');
        }
    } catch (err) {
        failed++;
        console.log(`FAIL ${name}  ${err.message}`);
        if (err.cause?.message) console.log(`     cause: ${err.cause.message}`);
    }
    console.log('');
}

process.exit(failed > 0 ? 1 : 0);
