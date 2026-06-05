// src/hooks/useGridData.js
import { useState, useEffect } from 'react';
import { fetchClosestMeterRecord } from '../api/aws-api';

// Hook name matches file: useGridData
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
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [busId, targetTime]);

    return { data, isLoading, error };
}