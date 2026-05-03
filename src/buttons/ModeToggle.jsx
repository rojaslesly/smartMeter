// Toggle button declaring "easy" or "hard" mode
export default function ModeToggle({ mode, setMode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        background: "#e5e5e5",
        padding: "4px",
        borderRadius: "12px",
        gap: "4px",
      }}
    >
      <button
        type="button"
        onClick={() => setMode("easy")}
        aria-pressed={mode === "easy"}
        style={{
          padding: "6px 16px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          background: mode === "easy" ? "#111" : "transparent",
          color: mode === "easy" ? "white" : "#333",
          fontWeight: 500,
        }}
      >
        Simple
      </button>

      <button
        type="button"
        onClick={() => setMode("hard")}
        aria-pressed={mode === "hard"}
        style={{
          padding: "6px 16px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          background: mode === "hard" ? "#111" : "transparent",
          color: mode === "hard" ? "white" : "#333",
          fontWeight: 500,
        }}
      >
        Expert
      </button>
    </div>
  );
}

// import { useState } from "react";
// import "./ModeToggle.css";

// export default function ModeToggle({ mode, setMode }) {
//   return (
//     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//       <button
//         type="button"
//         onClick={() => setMode("easy")}
//         aria-pressed={mode === "easy"}
//         style={{
//           padding: "8px 12px",
//           borderRadius: 10,
//           border: "1px solid #ccc",
//           fontWeight: mode === "easy" ? 700 : 400,
//         }}
//       >
//         Easy Mode
//       </button>

//       <button
//         type="button"
//         onClick={() => setMode("hard")}
//         aria-pressed={mode === "hard"}
//         style={{
//           padding: "8px 12px",
//           borderRadius: 10,
//           border: "1px solid #ccc",
//           fontWeight: mode === "hard" ? 700 : 400,
//         }}
//       >
//         Hard Mode
//       </button>

//       <span style={{ marginLeft: 8 }}>
//         Current: <b>{mode}</b>
//       </span>
//     </div>
//   );
// }