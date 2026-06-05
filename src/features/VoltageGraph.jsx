import { useMemo } from "react";
import { parseDbTime, formatDbTime } from "../utils/gridData";

export default function VoltageGraph({ gridData, isLoading }) {
  const data = useMemo(() => {
    if (!gridData) return [];

    const rows = Array.isArray(gridData?.rows)
      ? gridData.rows
      : [gridData];

    return rows
      .filter((row) => row?.record_time && row?.voltage !== undefined)
      .sort((a, b) => parseDbTime(a.record_time) - parseDbTime(b.record_time))
      .slice(-3)
      .map((row) => ({
        id: row.record_id,
        time: row.record_time,
        voltage: Number(row.voltage),
      }));
  }, [gridData]);

  const width = 400;
  const height = 280;
  const padding = 80;

  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const voltageValues = data.map((row) => Number(row.voltage));

  const rawMinVoltage = voltageValues.length ? Math.min(...voltageValues) : 0;
  const rawMaxVoltage = voltageValues.length ? Math.max(...voltageValues) : 0;

  const buffer = Math.max((rawMaxVoltage - rawMinVoltage) * 0.2, 5);

  const minVoltage = rawMinVoltage - buffer;
  const maxVoltage = rawMaxVoltage + buffer;
  const voltageRange = maxVoltage - minVoltage || 1;

  const yTicks = [minVoltage, minVoltage + voltageRange / 2, maxVoltage];

  const points = data.map((row, index) => {
    const voltage = Number(row.voltage);

    const x =
      data.length === 1
        ? padding + graphWidth / 2
        : padding + (index / (data.length - 1)) * graphWidth;

    const y = padding + ((maxVoltage - voltage) / voltageRange) * graphHeight;

    return {
      x,
      y,
      time: formatDbTime(row.record_time, { hour: "2-digit", minute: "2-digit" }),
      voltage,
    };
  });

  const linePath = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    )
    .join(" ");

  if (isLoading) {
    return (
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "10px", width: "100%", maxWidth: "500px", boxSizing: "border-box", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", margin: "0 auto 10px auto", height: 280, display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
        Loading…
      </div>
    );
  }

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
          paddingRight: "120px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#111",
          lineHeight: "140%",
        }}
      >
        Voltage Over Time
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" />

        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />

        {yTicks.map((tick) => {
          const y = padding + ((maxVoltage - tick) / voltageRange) * graphHeight;

          return (
            <g key={tick}>
              <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="black" />

              <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="12">
                {tick.toFixed(3).replace(/\.?0+$/, "")}
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
          Voltage
        </text>

        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
        >
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
              {point.voltage.toFixed(3).replace(/\.?0+$/, "")}V
            </text>

            <text
              x={point.x}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
            >
              {point.time}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}