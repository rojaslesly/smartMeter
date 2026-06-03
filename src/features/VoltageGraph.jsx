import pqData from "../data/pqDataTable.json";

export default function VoltageGraph() {
  const data = pqData.data;

  const width = 400;
  const height = 280;
  const padding = 80;

  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const voltageValues = data.map((row) => row.voltage);

  const minVoltage = Math.min(...voltageValues);
  const maxVoltage = Math.max(...voltageValues);

  const voltageRange = maxVoltage - minVoltage || 1;

  const yTicks = [
    minVoltage,
    minVoltage + voltageRange / 2,
    maxVoltage,
  ];

  const points = data.map((row, index) => {
    const x = padding + (index / (data.length - 1)) * graphWidth;

    const y =
      padding +
      ((maxVoltage - row.voltage) / voltageRange) * graphHeight;

    return {
      x,
      y,
      time: row.time,
      voltage: row.voltage,
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
        margin: "16px auto 10 auto",
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
        {/* y-axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="black"
        />

        {/* x-axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="black"
        />

        {/* y-axis ticks */}
        {yTicks.map((tick) => {
          const y =
            padding +
            ((maxVoltage - tick) / voltageRange) * graphHeight;

          return (
            <g key={tick}>
              <line
                x1={padding - 5}
                y1={y}
                x2={padding}
                y2={y}
                stroke="black"
              />

              <text
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* y-axis title */}
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

        {/* x-axis title */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
        >
          Time
        </text>

        {/* graph line */}
        <path
          d={linePath}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
        />

        {/* points, value labels, and time labels */}
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
              {point.voltage}V
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