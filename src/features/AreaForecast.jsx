import { useEffect, useState } from 'react';
import outageData from '../data/outageData.json';

export default function AreaForecast() {
  const [index, setIndex] = useState(0);
  const severity = outageData[index]?.severity ?? 2;

  let stage;

  if (severity === 0) {
    stage = {
      bg: '#ffd6d6',
      border: '#d32f2f',
      text: 'Outage Happening In Your Area',
    };
  } else if (severity === 1) {
    stage = {
      bg: '#fff4cc',
      border: '#f2c300',
      text: 'Grid Is Unstable',
    };
  } else {
    stage = {
      bg: '#d9f5dd',
      border: '#2e7d32',
      text: 'Grid Is Operating Normally',
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % outageData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
