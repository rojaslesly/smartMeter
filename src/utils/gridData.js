import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// DB power_quality: solver deviation from ideal (0 = best). Tune from observed range.
const PQ_MAX_DEVIATION = 0.025;

/** Map DB decimal to 0–100+ for dial / ChargeForecast. */
export function pqToPercent(pq) {
    const v = Number(pq);
    if (!Number.isFinite(v)) return 0;
    const pct = 100 * (1 - Math.abs(v) / PQ_MAX_DEVIATION);
    return Math.max(0, Math.round(pct));
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
