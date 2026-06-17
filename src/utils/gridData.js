import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/** Current UTC timestamp string for use as a Lambda target_time. */
export function utcNow() {
    return dayjs().utc().format('YYYY-MM-DD HH:mm:ss');
}

/** Normalise the gridData shape used across graph components. */
export function normalizeGridRows(gridData) {
    if (!gridData) return [];
    return Array.isArray(gridData?.rows) ? gridData.rows : [gridData];
}

/**
 * Piecewise linear interpolation between two points.
 */
function lerp(x, x0, x1, y0, y1) {
    const t = Math.max(0, Math.min(1, (x - x0) / (x1 - x0)));
    return y0 + t * (y1 - y0);
}

/**
 * Convert raw voltage deviation (local_bus_voltage - ideal_bus_voltage, in p.u.)
 * to a 0–100 Grid Health % using an asymmetric ANSI C84.1 tolerance band.
 *
 * Center (0.0 p.u.) = 100% — ideal nominal voltage.
 * Deviating in either direction degrades health, but overvoltage and
 * undervoltage have different ANSI limits and real-world severities.
 *
 * Positive (overvoltage):
 *   0.000           → 100%  Ideal
 *   0.000–0.010     → 100–90%  (minor capacitance, healthy)
 *   0.010–0.030     → 90–60%   (approaching upper limits)
 *   0.030–0.060     → 60–10%   (regulatory breach, equipment damage risk)
 *   0.060+          → 10–0%    (critical overvoltage)
 *
 * Negative (undervoltage):
 *   0.000           → 100%  Ideal
 *   0.000–0.010     → 100–90%  (negligible, healthy)
 *   0.010–0.050     → 90–50%   (ANSI normal range, still acceptable)
 *   0.050–0.070     → 50–20%   (breaching ANSI 5% limit, brownout risk)
 *   0.070–0.200     → 20–0%    (severe brownout, major grid stress)
 *   ≤ -1.0          → 0%       (outage sentinel from solver)
 */
/**
 * Direction-aware label from raw voltage deviation.
 * Positive deviation = overvoltage, negative = undervoltage.
 */
export function pqLabel(rawPq) {
    const v = Number(rawPq);
    if (!Number.isFinite(v)) return 'No Data';
    if (v <= -1.0) return 'Outage';
    const pct = pqToPercent(v);
    const high = v > 0;
    if (pct >= 95) return 'Ideal';
    if (pct >= 80) return high ? 'Slightly High' : 'Slightly Low';
    if (pct >= 50) return high ? 'Above Normal'  : 'Below Normal';
    if (pct >= 20) return high ? 'Well Above'    : 'Well Below';
    return               high  ? 'Critical High' : 'Critical Low';
}

export function pqToPercent(pq) {
    const v = Number(pq);
    if (!Number.isFinite(v)) return 0;
    if (v <= -1.0) return 0; // outage sentinel (-100.0 from Julia)

    if (v >= 0) {
        // Overvoltage path
        if (v <= 0.010) return Math.round(lerp(v, 0,     0.010, 100, 90));
        if (v <= 0.030) return Math.round(lerp(v, 0.010, 0.030,  90, 60));
        if (v <= 0.060) return Math.round(lerp(v, 0.030, 0.060,  60, 10));
        return Math.max(0, Math.round(lerp(v, 0.060, 0.100, 10, 0)));
    } else {
        // Undervoltage path
        const a = -v;
        if (a <= 0.010) return Math.round(lerp(a, 0,     0.010, 100, 90));
        if (a <= 0.050) return Math.round(lerp(a, 0.010, 0.050,  90, 50));
        if (a <= 0.070) return Math.round(lerp(a, 0.050, 0.070,  50, 20));
        if (a <= 0.200) return Math.round(lerp(a, 0.070, 0.200,  20,  0));
        return 0;
    }
}

/**
 * Parse a DB timestamp string as UTC using dayjs.
 * dayjs.utc() handles "2026-06-05 00:33:55" and ISO formats reliably.
 */
export function parseDbTime(str) {
    if (!str) return new Date(NaN);
    return dayjs.utc(String(str)).toDate();
}

/**
 * Format a DB timestamp for display in UTC — matches what the DB stores.
 */
export function formatDbTime(str, opts = {}) {
    const d = parseDbTime(str);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString([], { timeZone: 'UTC', ...opts });
}
