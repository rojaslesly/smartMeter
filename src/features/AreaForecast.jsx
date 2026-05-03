import { useEffect, useState } from "react";
import outageData from "../data/outageData.json";

export default function AreaForecast() {

  const [index, setIndex] = useState(0);
  const severity = outageData[index]?.severity ?? 2;

  let stage;

  if (severity === 0) {
    stage = {
      bg: "#ffd6d6",
      border: "#d32f2f",
      text: "Outage Happening In Your Area"
    };
  } else if (severity === 1) {
    stage = {
      bg: "#fff4cc",
      border: "#f2c300",
      text: "Grid Is Unstable"
    };
  } else {
    stage = {
      bg: "#d9f5dd",
      border: "#2e7d32",
      text: "Grid Is Operating Normally"
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
        padding: 16,
        borderRadius: 16,
        background: stage.bg,
        border: `2px solid ${stage.border}`
      }}
    >
      <h3>Area Forecast</h3>
      <p>{stage.text}</p>
    </div>
  );
}
// // Notifies user about Outages happening in their area
// export default function AreaForecast() {
//   const outage = 0;
//   let stage;

//   if (outage == 0) {
//     stage = {
//       bg: '#ffd6d6',
//       border: '#d32f2f',
//       text: `Outage Happening In Your Area`,

//     };
//   }

//   return (
//     <div
//       style={{
//         marginTop: 16,
//         padding: 16,
//         borderRadius: 16,
//         background: stage.bg,
//         border: `2px solid ${stage.border}`,
//       }}
//       >
//       <h3>Area Forecast</h3>
//       <p>{stage.text}</p>
//       </div>
//   );
// }