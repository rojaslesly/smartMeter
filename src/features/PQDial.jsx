import { useEffect, useMemo } from 'react';
import { formatDbTime } from '../utils/gridData';

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

export default function Dial_PQ({ pq = 0, rawPq, onValueChange, recordTime }) {
  const value = Math.max(0, Math.round(Number(pq) || 0));

  const W = 420;
  const H = 230;

  const cx = W / 2;
  const cy = 190;

  const r = 145;

  const min = 0;
  const max = 100;

  const startAngle = -180;
  const endAngle = 0;

  const bubbleAngle = useMemo(() => {
    const t = Math.min(1, (value - min) / (max - min));

    return startAngle + t * (endAngle - startAngle);
  }, [value]);

  const bubblePosition = polarToCartesian(cx, cy, r, bubbleAngle);

  const bubbleColor =
    value <= 19
      ? '#d32f2f'
      : value <= 49
      ? '#f2c300'
      : value <= 79
      ? '#b9d84a'
      : value <= 94
      ? '#66bb6a'
      : '#2e7d32';

  const conditionLabel =
    value === 0 ? 'Critical'
    : value <= 19 ? 'Brownout Risk'
    : value <= 49 ? 'Poor'
    : value <= 79 ? 'Fair'
    : value <= 94 ? 'Normal'
    : 'Ideal';

  useEffect(() => {
    onValueChange?.(value);
  }, [value, onValueChange]);

  const segments = [
    { from: -180, to: -135, color: '#d32f2f' },
    { from: -135, to: -90,  color: '#f2c300' },
    { from: -90,  to: -45,  color: '#b9d84a' },
    { from: -45,  to: 0,    color: '#2e7d32' },
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
          fontSize: '16px',
          fontWeight: '700',
          color: '#111',
          lineHeight: '140%',
          whiteSpace: 'nowrap',
        }}
      >
        Power Quality
      </h3>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
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

        <circle
          cx={bubblePosition.x}
          cy={bubblePosition.y}
          r={22}
          fill="#fff"
          stroke={bubbleColor}
          strokeWidth={5}
        />

        <text
          x={cx}
          y={cy - 40}
          textAnchor="middle"
          fontSize="42"
          fontWeight="700"
          fill="#000"
        >
          {value}%
        </text>

        <text
          x={cx}
          y={cy + 3}
          textAnchor="middle"
          fontSize="22"
          fill={bubbleColor}
          fontWeight="700"
        >
          {conditionLabel}
        </text>

        {recordTime && (
          <text
            x={cx}
            y={cy + 24}
            textAnchor="middle"
            fontSize="13"
            fill="#888"
          >
            As of: {formatDbTime(recordTime, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </text>
        )}
      </svg>
    </div>
  );
}