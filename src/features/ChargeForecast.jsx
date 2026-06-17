export default function ChargeForecast({ pq, rawPq }) {
  const v = Math.max(0, Math.min(100, Number(pq) || 0));
  const isHigh = (rawPq ?? 0) > 0;

  let stage;
  if (v <= 20) {
    stage = {
      bg: '#ffd6d6', border: '#d32f2f',
      text: isHigh ? 'Overvoltage — avoid charging' : 'Undervoltage — avoid charging',
    };
  } else if (v <= 50) {
    stage = {
      bg: '#fff1c2', border: '#f2c300',
      text: isHigh ? 'Voltage above normal — charge if necessary' : 'Voltage below normal — charge if necessary',
    };
  } else if (v < 95) {
    stage = {
      bg: '#e8f4c6', border: '#b9d84a',
      text: isHigh ? 'Slightly high voltage — good to charge' : 'Slightly low voltage — good to charge',
    };
  } else {
    stage = {
      bg: '#d7f5dd', border: '#2e7d32',
      text: 'Ideal conditions — best time to charge',
    };
  }

  return (
    <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 12, background: stage.bg, border: `3px solid ${stage.border}`, color: '#111' }}>
      <h4 style={{ margin: '0 0 6px 0' }}>EV Charge Forecast</h4>
      <p style={{ margin: 0 }}>{stage.text}</p>
    </div>
  );
}
