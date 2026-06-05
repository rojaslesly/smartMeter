import { useMemo } from "react";

export default function PowerQualityGraph({ gridData }) {
  const data = useMemo(() => {
    if (!gridData) return [];

    const rows = Array.isArray(gridData?.rows)
      ? gridData.rows
      : [gridData];

    return rows
      .filter((row) => row?.record_time && row?.power_quality !== undefined)
      .sort((a, b) => new Date(a.record_time) - new Date(b.record_time))
      .slice(-3)
      .map((row) => ({
        id: row.record_id,
        time: row.record_time,
        powerQuality: row.power_quality,
      }));
  }, [gridData]);

  const width = 400;
  const height = 280;
  const padding = 65;

  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const yTicks = [0, 25, 50, 75, 100];

  const points = data.map((row, index) => {
    const x =
      data.length === 1
        ? padding + graphWidth / 2
        : padding + (index / (data.length - 1)) * graphWidth;

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
              {Number(point.powerQuality).toFixed(3).replace(/\.?0+$/, "")}
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