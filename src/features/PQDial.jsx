import React, { useEffect, useMemo, useState } from "react";
import pqData from "../data/pqData.json";

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (Math.PI / 180) * angleDeg;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ].join(" ");
}

export default function Dial_PQ({ onValueChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = pqData[currentIndex];
  const value = currentItem?.pq ?? 0;

  const W = 320;
  const H = 190;
  const cx = W / 2;
  const cy = 150;
  const r = 95;

  const min = 0;
  const max = 100;
  const startAngle = -180;
  const endAngle = 0;

  const needleAngle = useMemo(() => {
    const t = (value - min) / (max - min);
    return startAngle + t * (endAngle - startAngle);
  }, [value]);

  useEffect(() => {
    onValueChange?.(value);
  }, [value, onValueChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pqData.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const segments = [
    { from: -180, to: -135, color: "#d32f2f" },
    { from: -135, to: -90, color: "#f2c300" },
    { from: -90, to: -45, color: "#b9d84a" },
    { from: -45, to: 0, color: "#2e7d32" },
  ];

  return (
    <div
      style={{
        width: "320px",
        minHeight: "260px",
        background: "#f7f7f7",
        border: "1px solid #d9d9d9",
        borderRadius: "16px",
        padding: "18px",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: "12px",
          fontSize: "18px",
          fontWeight: "700",
          color: "#111",
        }}
      >
        Power Quality
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          <path
            d={describeArc(cx, cy, r, -180, 0)}
            fill="none"
            stroke="#eee"
            strokeWidth={26}
            strokeLinecap="round"
          />

          {segments.map((s, i) => (
            <path
              key={i}
              d={describeArc(cx, cy, r, s.from, s.to)}
              fill="none"
              stroke={s.color}
              strokeWidth={26}
              strokeLinecap="butt"
            />
          ))}

          {[-135, -90, -45].map((a) => {
            const p1 = polarToCartesian(cx, cy, r - 13, a);
            const p2 = polarToCartesian(cx, cy, r + 13, a);
            return (
              <line
                key={a}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#fff"
                strokeWidth={4}
                strokeLinecap="round"
                opacity={0.9}
              />
            );
          })}

          <g transform={`rotate(${needleAngle} ${cx} ${cy})`}>
            <line
              x1={cx}
              y1={cy}
              x2={cx + r * 0.75}
              y2={cy}
              stroke="#263238"
              strokeWidth={5}
              strokeLinecap="round"
            />
          </g>

          <circle cx={cx} cy={cy} r={12} fill="#263238" />
        </svg>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#444" }}>
        <div>Current Power Quality: <b>{value}</b></div>
        <div>Time: <b>{currentItem?.time}</b></div>
      </div>
    </div>
  );
}
// import React, { useMemo, useState } from "react";

// function polarToCartesian(cx, cy, r, angleDeg) {
//   const rad = (Math.PI / 180) * angleDeg;
//   return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
// }

// function describeArc(cx, cy, r, startAngle, endAngle) {
//   const start = polarToCartesian(cx, cy, r, startAngle);
//   const end = polarToCartesian(cx, cy, r, endAngle);
//   const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";

//   return [
//     "M",
//     start.x,
//     start.y,
//     "A",
//     r,
//     r,
//     0,
//     largeArcFlag,
//     1,
//     end.x,
//     end.y,
//   ].join(" ");
// }

// function Dial_PQ({ onValueChange }) {
//   const [value, setValue] = useState(65);

//   const W = 360;
//   const H = 220;
//   const cx = W / 2;
//   const cy = 170;
//   const r = 120;

//   const min = 0;
//   const max = 100;
//   const startAngle = -180;
//   const endAngle = 0;

//   const needleAngle = useMemo(() => {
//     const t = (value - min) / (max - min);
//     return startAngle + t * (endAngle - startAngle);
//   }, [value]);

//   const segments = [
//     { from: -180, to: -135, color: "#d32f2f" },
//     { from: -135, to: -90, color: "#f2c300" },
//     { from: -90, to: -45, color: "#b9d84a" },
//     { from: -45, to: 0, color: "#2e7d32" },
//   ];

//   return (
//     <div
//       style={{
//         width: "320px",
//         minHeight: "260px",
//         background: "#f7f7f7",
//         border: "1px solid #d9d9d9",
//         borderRadius: "16px",
//         padding: "18px",
//         boxSizing: "border-box",
//       }}
//     >
//       <h3
//         style={{
//           margin: 0,
//           marginBottom: "12px",
//           fontSize: "18px",
//           fontWeight: "700",
//           color: "#111",
//         }}
//       >
//         Power Quality
//       </h3>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"
//         }}
//       >
//         <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
//           <path
//             d={describeArc(cx, cy, r, -180, 0)}
//             fill="none"
//             stroke="#eee"
//             strokeWidth={26}
//             strokeLinecap="round"
//           />

//           {segments.map((s, i) => (
//             <path
//               key={i}
//               d={describeArc(cx, cy, r, s.from, s.to)}
//               fill="none"
//               stroke={s.color}
//               strokeWidth={26}
//               strokeLinecap="butt"
//             />
//           ))}

//           {[-135, -90, -45].map((a) => {
//             const p1 = polarToCartesian(cx, cy, r - 13, a);
//             const p2 = polarToCartesian(cx, cy, r + 13, a);
//             return (
//               <line
//                 key={a}
//                 x1={p1.x}
//                 y1={p1.y}
//                 x2={p2.x}
//                 y2={p2.y}
//                 stroke="#fff"
//                 strokeWidth={4}
//                 strokeLinecap="round"
//                 opacity={0.9}
//               />
//             );
//           })}

//           <g transform={`rotate(${needleAngle} ${cx} ${cy})`}>
//             <line
//               x1={cx}
//               y1={cy}
//               x2={cx + r * 0.75}
//               y2={cy}
//               stroke="#263238"
//               strokeWidth={5}
//               strokeLinecap="round"
//             />
//           </g>

//           <circle cx={cx} cy={cy} r={12} fill="#263238" />
//         </svg>
//       </div>

//       <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: "10px" }}>
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={value}
//           onChange={(e) => {
//             const v = Number(e.target.value);
//             setValue(v);
//             onValueChange?.(v);
//           }}
//           style={{ flex: 1 }}
//         />
//         <div style={{ width: 44, textAlign: "right" }}>{value}</div>
//       </div>
//     </div>
//   );
// }

// export default Dial_PQ;

// // // Dial that displays power quality in "easy mode"
// // import React, { useMemo, useState } from "react";

// // // [Helper Function] (math)
// // function polarToCartesian(cx, cy, r, angleDeg) {
// //   const rad = (Math.PI / 180) * angleDeg;
// //   return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
// // }

// // // [Helper Function] SVG arc path from startAngle -> endAngle (degrees), clockwise-ish in screen coords
// // function describeArc(cx, cy, r, startAngle, endAngle) {
// //   const start = polarToCartesian(cx, cy, r, startAngle);
// //   const end = polarToCartesian(cx, cy, r, endAngle);
// //   const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";

// //   return [
// //     "M",
// //     start.x,
// //     start.y,
// //     "A",
// //     r,
// //     r,
// //     0,
// //     largeArcFlag,
// //     1,
// //     end.x,
// //     end.y,
// //   ].join(" ");
// // }

// // // Main dial function 
// // function Dial_PQ({onValueChange}) {
// //   // user input (0..100)
// //   const [value, setValue] = useState(65);

// //   // gauge geometry
// //   const W = 360;
// //   const H = 220;
// //   const cx = W / 2;
// //   const cy = 170;      // center is lower to make a semicircle
// //   const r = 120;

// //   // needle angles
// //   const min = 0;
// //   const max = 100;
// //   const startAngle = -180; // left
// //   const endAngle = 0;      // right

// //   // map value -> angle
// //   const needleAngle = useMemo(() => {
// //     const t = (value - min) / (max - min);          // 0..1
// //     return startAngle + t * (endAngle - startAngle); // -180..0
// //   }, [value]);

// //   // 4 colored segments (adjust however you want)
// //   const segments = [
// //     { from: -180, to: -135, color: "#d32f2f" }, // red
// //     { from: -135, to: -90,  color: "#f2c300" }, // yellow
// //     { from: -90,  to: -45,  color: "#b9d84a" }, // light green
// //     { from: -45,  to: 0,    color: "#2e7d32" }, // green
// //   ];

// //   return (
// //     <div style={{ maxWidth: 420, fontFamily: "system-ui, sans-serif" }}>
// //       <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
// //         {/* Background arc (optional) */}
// //         <path
// //           d={describeArc(cx, cy, r, -180, 0)}
// //           fill="none"
// //           stroke="#eee"
// //           strokeWidth={26}
// //           strokeLinecap="round"
// //         />

// //         {/* Colored segments */}
// //         {segments.map((s, i) => (
// //           <path
// //             key={i}
// //             d={describeArc(cx, cy, r, s.from, s.to)}
// //             fill="none"
// //             stroke={s.color}
// //             strokeWidth={26}
// //             strokeLinecap="butt"
// //           />
// //         ))}

// //         {/* little separators like your image (optional) */}
// //         {[-135, -90, -45].map((a) => {
// //           const p1 = polarToCartesian(cx, cy, r - 13, a);
// //           const p2 = polarToCartesian(cx, cy, r + 13, a);
// //           return (
// //             <line
// //               key={a}
// //               x1={p1.x}
// //               y1={p1.y}
// //               x2={p2.x}
// //               y2={p2.y}
// //               stroke="#fff"
// //               strokeWidth={4}
// //               strokeLinecap="round"
// //               opacity={0.9}
// //             />
// //           );
// //         })}

// //         {/* Needle */}
// //         <g transform={`rotate(${needleAngle} ${cx} ${cy})`}>
// //           <line
// //             x1={cx}
// //             y1={cy}
// //             x2={cx + r * 0.75}
// //             y2={cy}
// //             stroke="#263238"
// //             strokeWidth={5}
// //             strokeLinecap="round"
// //           />
// //         </g>

// //         {/* Needle hub */}
// //         <circle cx={cx} cy={cy} r={12} fill="#263238" />
// //       </svg>

// //       <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
// //         <input
// //           type="range"
// //           min={min}
// //           max={max}
// //           value={value}
// //           onChange={(e) => {
// //             const v = Number(e.target.value);
// //             setValue(v);
// //             onValueChange?.(v); // <-- send value to parent (if provided)
// //           }}
// //           style={{ flex: 1 }}
// //         />
// //         <div style={{ width: 44, textAlign: "right" }}>{value}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dial_PQ;