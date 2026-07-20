export default function ChargeForecast({ pq, rawPq }) {
  const v = Math.max(0, Math.min(100, Number(pq) || 0));
  const isHigh = (rawPq ?? 0) > 0;

  let stage;
  if (v <= 20) {
    stage = {
      bg: '#ffd6d6', border: '#d32f2f',
      recommendation: 'Avoid charging',
      voltageInfo: isHigh ? 'Your home is experiencing significantly high voltage' : 'Your home is experiencing significantly low voltage',
    };
  } else if (v <= 50) {
    stage = {
      bg: '#fff1c2', border: '#f2c300',
      recommendation: 'Charge only if necessary',
      voltageInfo: isHigh ? 'Your meter is reading above-normal voltage' : 'Your meter is reading below-normal voltage',
    };
  } else if (v < 95) {
    stage = {
      bg: '#e8f4c6', border: '#b9d84a',
      recommendation: 'Good time to charge',
      voltageInfo: isHigh ? 'Your home\'s voltage is slightly above normal' : 'Your home\'s voltage is slightly below normal',
    };
  } else {
    stage = {
      bg: '#d7f5dd', border: '#2e7d32',
      recommendation: 'Best time to charge',
      voltageInfo: 'Ideal conditions',
    };
  }

  return (
    <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 12, background: stage.bg, border: `3px solid ${stage.border}`, color: '#111' }}>
      <h4 style={{ margin: '0 0 6px 0' }}>EV Charge Forecast:</h4>
      <p style={{ margin: '0 0 4px 0', fontWeight: 600, textAlign: 'center' }}>{stage.recommendation}</p>
      <p style={{ margin: 0, fontSize: '13px', textAlign: 'center', color: '#444' }}>{stage.voltageInfo}</p>
    </div>
  );
}
