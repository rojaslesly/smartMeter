import React, { useEffect, useMemo, useState } from 'react';
import pqData from '../data/pqData.json';

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (Math.PI / 180) * angleDeg;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);

  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ].join(' ');
}

export default function Dial_PQ({ onValueChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = pqData[currentIndex];
  const value = currentItem?.pq ?? 0;

  const W = 420;
  const H = 230;

  const cx = W / 2;
  const cy = 190;

  const r = 145;

  const min = 0;
  const max = 100;

  const startAngle = -180;
  const endAngle = 0;

  // Maps value -> bubble angle
  const bubbleAngle = useMemo(() => {
    const t = (value - min) / (max - min);

    return startAngle + t * (endAngle - startAngle);
  }, [value]);

  // Gets x/y location of bubble
  const bubblePosition = polarToCartesian(cx, cy, r, bubbleAngle);

  // NEW:
  // Bubble outline color changes with level
  const bubbleColor =
    value <= 25
      ? '#d32f2f' // red
      : value <= 50
      ? '#f2c300' // yellow
      : value <= 75
      ? '#b9d84a' // light green
      : '#2e7d32'; // green

  // NEW:
  // Changes label text depending on power quality
  const conditionLabel =
    value <= 25
      ? 'Poor conditions'
      : value <= 50
      ? 'Moderate conditions'
      : value <= 75
      ? 'Stable conditions'
      : 'Excellent conditions';

  useEffect(() => {
    onValueChange?.(value);
  }, [value, onValueChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pqData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const segments = [
    { from: -180, to: -135, color: '#d32f2f' },
    { from: -135, to: -90, color: '#f2c300' },
    { from: -90, to: -45, color: '#b9d84a' },
    { from: -45, to: 0, color: '#2e7d32' },
  ];

  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '16px',
        padding: '5px',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          margin: 10,
          marginBottom: '5px',
          paddingRight: '200px',
          fontSize: '16px',
          fontWeight: '700',
          color: '#111',
          lineHeight: '140%',
        }}
      >
        Power Quality
      </h3>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* Colored dial segments */}
        {segments.map((s, i) => (
          <path
            key={i}
            d={describeArc(cx, cy, r, s.from, s.to)}
            fill="none"
            stroke={s.color}
            strokeWidth={38}
            strokeLinecap="butt"
          />
        ))}

        {/* White separators */}
        {[-135, -90, -45].map((a) => {
          const p1 = polarToCartesian(cx, cy, r - 20, a);

          const p2 = polarToCartesian(cx, cy, r + 20, a);

          return (
            <line
              key={a}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#fff"
              strokeWidth={5}
            />
          );
        })}

        {/* Moving bubble */}
        <circle
          cx={bubblePosition.x}
          cy={bubblePosition.y}
          r={22}
          // Bubble inside
          fill="#fff"
          // CHANGED:
          // Bubble border changes color
          stroke={bubbleColor}
          strokeWidth={5}
        />

        {/* Center value */}
        <text
          x={cx}
          y={cy - 40} // To change position of middle number
          textAnchor="middle"
          fontSize="42"
          fontWeight="700"
          fill="#000"
        >
          {value}
        </text>

        {/* Label */}
        <text
          x={cx}
          y={cy + 3}
          textAnchor="middle"
          fontSize="18"
          fill="#000"
          fontWeight="500"
        >
          {conditionLabel}
        </text>
      </svg>
    </div>
  );
}
