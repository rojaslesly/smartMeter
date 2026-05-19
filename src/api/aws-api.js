// src/api/aws-api.js
// NOTE: Provide `VITE_LAMBDA_URL` in your Vite env (.env) or replace below.
const LAMBDA_URL = import.meta.env.VITE_LAMBDA_URL;

export async function fetchClosestMeterRecord(busId, targetTime) {
    const params = new URLSearchParams({ bus_id: busId, target_time: targetTime });

    const url = `${LAMBDA_URL}?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        const err = new Error(`Failed to fetch grid data: ${response.status} ${response.statusText} ${text}`);
        err.status = response.status;
        err.body = text;
        throw err;
    }

    const data = await response.json().catch(() => null);
    return Array.isArray(data) ? data[0] : data;
}

// Safe stub for future global grid fetcher.
export async function fetchGlobalGridState() {
    // TODO: implement real endpoint. Returning null to avoid runtime syntax errors.
    return null;
}