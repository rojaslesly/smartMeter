// src/api/aws-api.js
// NOTE: Provide `VITE_LAMBDA_URL` in your Vite env (.env) or replace below.
// In dev, requests go through Vite proxy (/lambda) to avoid browser CORS blocks.
const LAMBDA_URL = import.meta.env.DEV ? '/lambda' : import.meta.env.VITE_LAMBDA_URL;

// Matches Lambda QUERY_TYPES
export const QUERY_TYPES = {
    LATEST_BUS: 'latest_bus',
    BUS_24H: 'bus_24h',
    LATEST_GLOBAL: 'latest_global',
    LAST_OUTAGE: 'last_outage',
};

async function fetchLambda(params) {
    const url = `${LAMBDA_URL}?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        const err = new Error(`Failed to fetch grid data: ${response.status} ${response.statusText} ${text}`);
        err.status = response.status;
        err.body = text;
        throw err;
    }

    return response.json().catch(() => null);
}

export async function fetchClosestMeterRecord(busId, targetTime) {
    const data = await fetchLambda(new URLSearchParams({
        query: QUERY_TYPES.LATEST_BUS,
        bus_id: busId,
        target_time: targetTime,
    }));
    return data?.rows?.[0] ?? null;
}

export async function fetchBus24h(busId, targetTime) {
    const data = await fetchLambda(new URLSearchParams({
        query: QUERY_TYPES.BUS_24H,
        bus_id: busId,
        target_time: targetTime,
    }));
    return data?.rows ?? [];
}

export async function fetchGlobalGridState(targetTime) {
    const data = await fetchLambda(new URLSearchParams({
        query: QUERY_TYPES.LATEST_GLOBAL,
        target_time: targetTime,
    }));
    return data?.rows?.[0] ?? null;
}

export async function fetchLastOutage(busId, targetTime) {
    const data = await fetchLambda(new URLSearchParams({
        query: QUERY_TYPES.LAST_OUTAGE,
        bus_id: busId,
        target_time: targetTime,
    }));
    return data?.rows?.[0] ?? null;
}
