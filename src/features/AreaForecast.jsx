import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useGlobalGridState } from '../hooks/useGridData';
import { pqToPercent } from '../utils/gridData';

dayjs.extend(utc);

export default function AreaForecast() {
  const [targetTime, setTargetTime] = useState(() =>
    dayjs().utc().format('YYYY-MM-DD HH:mm:ss')
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTargetTime(dayjs().utc().format('YYYY-MM-DD HH:mm:ss'));
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const { data, isLoading } = useGlobalGridState(targetTime);

  const pqPct = pqToPercent(data?.power_quality);

  let stage;
  if (isLoading || !data) {
    stage = { bg: '#f5f5f5', border: '#aaa', text: 'Loading area forecast…' };
  } else if (pqPct <= 25) {
    stage = { bg: '#ffd6d6', border: '#d32f2f', text: 'Critical Demand In Your Area' };
  } else if (pqPct <= 50) {
    stage = { bg: '#fff4cc', border: '#f2c300', text: 'High Grid Demand' };
  } else {
    stage = { bg: '#d9f5dd', border: '#2e7d32', text: 'Grid Load Is Normal' };
  }

  return (
    <div
      style={{
        marginTop: 16,
        marginBottom: 0,
        paddingBottom: 20,
        paddingTop: 0,
        padding: 0,
        borderRadius: 12,
        background: stage.bg,
        fontFamily: 'Inter, sans-serif',
        lineHeight: '20%',
        color: '#111',
        border: `3px solid ${stage.border}`,
      }}
    >
      <h4>Area Forecast</h4>
      <p>{stage.text}</p>
      <h4>             </h4>
    </div>
  );
}
