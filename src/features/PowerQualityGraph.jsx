import { useEffect, useState } from "react";

export default function PowerQualityGraph({ gridData }) {
  const [history, setHistory] = useState([]);

  const currentPowerQuality = gridData?.power_quality ?? 0;
  const currentTime = gridData?.record_time ?? new Date().toISOString();
  const currentRecordId = gridData?.record_id ?? currentTime;

  useEffect(() => {
    if (!gridData) return;

    const newPoint = {
      id: currentRecordId,
      time: currentTime,
      powerQuality: currentPowerQuality,
    };

    setHistory((prev) => {
      const alreadySaved = prev.some((point) => point.id === newPoint.id);

      if (alreadySaved) {
        return prev;
      }

      return [...prev, newPoint].slice(-3);
    });
  }, [gridData, currentRecordId, currentTime, currentPowerQuality]);

  const getDefaultData = () => {
    const now = new Date();

    return [
      {
        id: "default-1",
        time: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
        powerQuality: currentPowerQuality,
      },
      {
        id: "default-2",
        time: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        powerQuality: currentPowerQuality,
      },
      {
        id: "default-3",
        time: now.toISOString(),
        powerQuality: currentPowerQuality,
      },
    ];
  };

  const data = history.length >= 3 ? history : getDefaultData();

  const width = 400;
  const height = 280;
  const padding = 65;

  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const yTicks = [0, 25, 50, 75, 100];

  const points = data.map((row, index) => {
    const x = padding + (index / (data.length - 1)) * graphWidth;
    const y = padding + ((100 - row.powerQuality) / 100) * graphHeight;

    return {
      x,
      y,
      time: new Date(row.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      powerQuality: row.powerQuality,
    };
  });

  const linePath = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <div
    style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "10px",
      width: "100%",
      maxWidth: "500px",
      boxSizing: "border-box",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      margin: "0 auto 10px auto",
    }}
  
    >
      <h3
        style={{
          margin: 10,
          marginBottom: "-30px",
          paddingRight: "75px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#111",
          lineHeight: "140%",
        }}
      >
        Power Quality Over Time
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" />

        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />

        {yTicks.map((tick) => {
          const y = padding + ((100 - tick) / 100) * graphHeight;

          return (
            <g key={tick}>
              <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="black" />

              <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="12">
                {tick}
              </text>
            </g>
          );
        })}

        <text
          x={25}
          y={height / 2}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          transform={`rotate(-90 25 ${height / 2})`}
        >
          Power Quality
        </text>

        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="13" fontWeight="bold">
          Time
        </text>

        <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="3" />

        {points.map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="5" fill="#2563eb" />

            <text
              x={point.x}
              y={point.y - 10}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#000"
              stroke="white"
              strokeWidth="3"
              paintOrder="stroke"
            >
              {point.powerQuality}
            </text>

            <text x={point.x} y={height - padding + 20} textAnchor="middle" fontSize="12">
              {point.time}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}