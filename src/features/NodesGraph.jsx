import { useState } from "react";

export default function NetworkStatusCard({ areaState = "Normal" }) {
  const [mouse, setMouse] = useState(null);

  const highlightColor =
    areaState === "Outage" ? "#d32f2f" :
    areaState === "Warning" ? "#f4c542" :
    areaState === "Outage Risk" ? "#ff9800" :
    "#4caf50";
    areaState === "Stable" ? "#2e7d32" :
    "#4caf50";

  const nodes = [
    { id: 1, x: 40, y: 60 },
    { id: 2, x: 90, y: 35 },
    { id: 3, x: 140, y: 75 },
    { id: 4, x: 190, y: 45, highlighted: true },
    { id: 5, x: 240, y: 90 },
    { id: 6, x: 290, y: 55 },
    { id: 7, x: 340, y: 100 },
    { id: 8, x: 130, y: 135 },
    { id: 9, x: 210, y: 145 },
    { id: 10, x: 280, y: 135 },
  ];

  const links = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [6, 7], [3, 8], [8, 9], [9, 10], [10, 7],
    [2, 8], [4, 9], [5, 10],
  ];

  const getNode = (id) => nodes.find((node) => node.id === id);

  const moveNode = (node) => {
    if (!mouse) return node;

    const dx = node.x - mouse.x;
    const dy = node.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 90) return node;

    const push = (90 - distance) * 0.18;

    return {
      ...node,
      x: node.x + (dx / distance) * push,
      y: node.y + (dy / distance) * push,
    };
  };

  const movedNodes = nodes.map(moveNode);
  const getMovedNode = (id) => movedNodes.find((node) => node.id === id);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "16px",
        padding: "12px",
        width: "100%",
        maxWidth: "380px",
        boxSizing: "border-box",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        margin: "16px auto",
        overflow: "hidden",
      }}
    >
      <h3 
        style={{ textAlign: "left", 
        padding: '5px',
        margin: "0 0 8px 0" ,
        fontSize: '16px',
        fontWeight: '700',
        color: '#111',
        lineHeight: '140%',
        }}>
        Area Forecast Network
      </h3>

      <svg
        viewBox="0 0 380 180"
        width="100%"
        height="180"
        style={{ display: "block" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();

          setMouse({
            x: ((e.clientX - rect.left) / rect.width) * 380,
            y: ((e.clientY - rect.top) / rect.height) * 180,
          });
        }}
        onMouseLeave={() => setMouse(null)}
      >
        {links.map(([start, end], index) => {
          const a = getMovedNode(start);
          const b = getMovedNode(end);

          return (
            <line
              key={index}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#555"
              strokeWidth="1"
            />
          );
        })}

        {movedNodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.highlighted ? 9 : 7}
            fill={node.highlighted ? highlightColor : "#4f7db8"}
            stroke={node.highlighted ? "#222" : "none"}
            strokeWidth="2"
          />
        ))}
      </svg>

      <p style={{ textAlign: "center", margin: "8px 0 0 0" }}>
        Status: <strong>{areaState}</strong>
      </p>
    </div>
  );
}