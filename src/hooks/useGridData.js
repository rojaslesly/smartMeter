// src/hooks/useGridData.js
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
    fetchClosestMeterRecord,
    fetchBus24h,
    fetchGlobalGridState,
} from '../api/aws-api';

dayjs.extend(utc);

export function useGridData(busId, targetTime) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!busId || !targetTime) return;

        async function loadData() {
            setIsLoading(true);
            setError(null);
            try {
                const record = await fetchClosestMeterRecord(busId, targetTime);
                setData(record);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [busId, targetTime]);

    return { data, isLoading, error };
}

/**
 * Returns the last 24h of rows for a bus.
 * Anchors the time window around the most recent available record rather
 * than "now", so stale data (e.g. collection paused days ago) still loads.
 */
export function useBus24h(busId, targetTime) {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!busId || !targetTime) return;

        async function loadData() {
            setIsLoading(true);
            setError(null);
            try {
                // Step 1: find the most recent record for this bus
                const latest = await fetchClosestMeterRecord(busId, targetTime);
                const anchor = latest?.record_time
                    ? dayjs.utc(latest.record_time).format('YYYY-MM-DD HH:mm:ss')
                    : targetTime;

                // Step 2: fetch 24h of data anchored at that record's time
                const data = await fetchBus24h(busId, anchor);
                setRows(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [busId, targetTime]);

    return { rows, isLoading, error };
}

/** Returns the single latest global grid state record. */
export function useGlobalGridState(targetTime) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!targetTime) return;

        async function loadData() {
            setIsLoading(true);
            setError(null);
            try {
                const record = await fetchGlobalGridState(targetTime);
                setData(record);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [targetTime]);

    return { data, isLoading, error };
}