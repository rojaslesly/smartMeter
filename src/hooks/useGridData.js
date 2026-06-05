// src/hooks/useGridData.js
import { useState, useEffect } from 'react';
import {
    fetchClosestMeterRecord,
    fetchBus24h,
    fetchGlobalGridState,
} from '../api/aws-api';

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

/** Returns the last 24h of rows for a bus as an array. */
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
                const data = await fetchBus24h(busId, targetTime);
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