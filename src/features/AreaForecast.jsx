import { useState, useEffect } from 'react';
import { useGlobalGridState } from '../hooks/useGridData';
import { pqToPercent, utcNow } from '../utils/gridData';

export default function AreaForecast() {
  const [targetTime, setTargetTime] = useState(utcNow);

  useEffect(() => {
    const id = setInterval(() => setTargetTime(utcNow()), 30000);
    return () => clearInterval(id);
  }, []);

  const { data, isLoading } = useGlobalGridState(targetTime);

  const pqPct  = pqToPercent(data?.power_quality);
  const isHigh = (data?.power_quality ?? 0) > 0;

  let stage;
  if (isLoading || !data) {
    stage = { bg: '#f5f5f5', border: '#aaa', text: 'Loading area forecast…' };
  } else if (pqPct <= 20) {
    stage = { bg: '#ffd6d6', border: '#d32f2f', text: isHigh ? 'Critical Overvoltage In Your Area' : 'Critical Undervoltage In Your Area' };
  } else if (pqPct <= 50) {
    stage = { bg: '#fff4cc', border: '#f2c300', text: isHigh ? 'Grid Voltage Above Normal' : 'Grid Voltage Below Normal' };
  } else if (pqPct < 95) {
    stage = { bg: '#d9f5dd', border: '#2e7d32', text: isHigh ? 'Grid Slightly High' : 'Grid Slightly Low' };
  } else {
    stage = { bg: '#c8f5d0', border: '#1b5e20', text: 'Grid At Ideal Conditions' };
  }

  return (
    <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 12, background: stage.bg, border: `3px solid ${stage.border}`, color: '#111' }}>
      <h4 style={{ margin: '0 0 6px 0' }}>Area Forecast</h4>
      <p style={{ margin: 0 }}>{stage.text}</p>
    </div>
  );
}
