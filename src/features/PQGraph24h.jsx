import { useMemo } from "react";
import { pqToPercent, parseDbTime, formatDbTime } from "../utils/gridData";

const Y_MAX = 130;
const Y_TICKS = [0, 25, 50, 75, 100, 130];
const MAX_X_LABELS = 6;

export default function PQGraph24h({ gridData, isLoading }) {
  const data = useMemo(() => {
    if (!gridData) return [];
    const rows = Array.isArray(gridData?.rows) ? gridData.rows : [gridData];
    return rows
      .filter((row) => row?.record_time && row?.power_quality !== undefined)
      .sort((a, b) => parseDbTime(a.record_time) - parseDbTime(b.record_time))
      .map((row) => ({
        time: row.record_time,
        pq: pqToPercent(row.power_quality),
      }));
  }, [gridData]);

  const width   = 400;
  const height  = 280;
  const padL    = 60;
  const padR    = 30;
  const padT    = 55;
  const padB    = 60;
  const gW      = width  - padL - padR;
  const gH      = height - padT - padB;

  const points = data.map((row, i) => ({
    x: padL + (data.length > 1 ? (i / (data.length - 1)) * gW : gW / 2),
    y: padT + ((Y_MAX - row.pq) / Y_MAX) * gH,
    time: row.time,
    pq: row.pq,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  // Pick evenly-spaced label indices across all points
  const labelIndices = useMemo(() => {
    if (points.length === 0) return [];
    if (points.length <= MAX_X_LABELS) return points.map((_, i) => i);
    const step = (points.length - 1) / (MAX_X_LABELS - 1);
    return Array.from({ length: MAX_X_LABELS }, (_, i) => Math.round(i * step));
  }, [points.length]);

  if (isLoading) {
    return (
      <div style={{ ...cardStyle, height, display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Power Quality | 24 hr</h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={height - padB} stroke="#888" strokeWidth="1" />
        <line x1={padL} y1={height - padB} x2={width - padR} y2={height - padB} stroke="#888" strokeWidth="1" />

        {/* Y grid lines + ticks */}
        {Y_TICKS.map((tick) => {
          const y = padT + ((Y_MAX - tick) / Y_MAX) * gH;
          return (
            <g key={tick}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="#eee" strokeWidth="1" />
              <line x1={padL - 4} y1={y} x2={padL} y2={y} stroke="#888" />
              <text x={padL - 7} y={y + 4} textAnchor="end" fontSize="10" fill="#555">
                {tick}%
              </text>
            </g>
          );
        })}

        {/* 100% baseline + Ideal label */}
        {(() => {
          const y = padT + ((Y_MAX - 100) / Y_MAX) * gH;
          return (
            <g>
              <line
                x1={padL} y1={y} x2={width - padR} y2={y}
                stroke="#2e7d32" strokeWidth="1" strokeDasharray="4 3"
              />
              <text x={width - padR + 3} y={y + 4} fontSize="9" fill="#2e7d32" fontWeight="600">
                Ideal
              </text>
            </g>
          );
        })()}

        {/* Y axis label */}
        <text
          x={12} y={padT + gH / 2}
          textAnchor="middle" fontSize="11" fontWeight="bold" fill="#555"
          transform={`rotate(-90 12 ${padT + gH / 2})`}
        >
          PQ %
        </text>

        {/* Data line */}
        {points.length > 1 && (
          <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2" />
        )}

        {/* X axis time labels */}
        {labelIndices.map((idx) => {
          const p = points[idx];
          return (
            <text
              key={idx}
              x={p.x}
              y={height - padB + 14}
              textAnchor="middle"
              fontSize="9"
              fill="#555"
            >
              {formatDbTime(p.time, { hour: "2-digit", minute: "2-digit" })}
            </text>
          );
        })}

        {/* Empty state */}
        {points.length === 0 && (
          <text x={width / 2} y={height / 2} textAnchor="middle" fontSize="13" fill="#aaa">
            No data
          </text>
        )}
      </svg>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "500px",
  boxSizing: "border-box",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  margin: "0 auto 10px auto",
};

const titleStyle = {
  margin: 10,
  marginBottom: "-55px",
  fontSize: "16px",
  fontWeight: "700",
  color: "#111",
  lineHeight: "140%",
  textAlign: "center",
};
