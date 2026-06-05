// Displays best times to charge EVs.
//import Dial_PQ from '../features/PQDial';
// Gets Power Quality Data from Dial
// In the future will have to be updated to gather data from DB
// Red (0-25)
// Yellow (26-50)
// Light Green (51-75)
// Green (76-100)

export default function ChargeForecast({ pq }) {
  const v = Math.max(0, Math.min(100, Number(pq) || 0));

  let stage;

  if (v <= 25) {
    stage = {
      bg: '#ffd6d6',
      border: '#d32f2f',
      text: 'High grid demand — avoid charging',
    };
  } else if (v <= 50) {
    stage = {
      bg: '#fff1c2',
      border: '#f2c300',
      text: 'Charge only if necessary',
    };
  } else if (v <= 75) {
    stage = {
      bg: '#e8f4c6',
      border: '#b9d84a',
      text: 'Good conditions for charging',
    };
  } else {
    stage = {
      bg: '#d7f5dd',
      border: '#2e7d32',
      text: 'Best time to charge',
    };
  }

  return (
    <div
      style={{
        marginTop: 16,
        paddingBottom: '5px',
        paddingTop:'0px',
        padding: '0px',
        borderRadius: 12,
        background: stage.bg,
        border: `3px solid ${stage.border}`,
        fontFamily: 'Inter, sans-serif',
        lineHeight: '20%',
        color: '#111',
      }}
    >
      <h4>EV Charge Forecast</h4>
      <p>{stage.text}</p>
      <h4>             </h4>
    </div>
  );
}
