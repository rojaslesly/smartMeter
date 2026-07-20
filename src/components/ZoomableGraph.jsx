import { useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

/** Wraps a full card with a magnifying-glass button. Only the button triggers zoom. */
export default function ZoomableGraph({ children }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <ControlledZoom isZoomed={isZoomed} onZoomChange={setIsZoomed}>
        {/* pointer-events: none blocks the library's own click-to-zoom on the content */}
        <div style={{ pointerEvents: "none" }}>{children}</div>
      </ControlledZoom>

      {!isZoomed && (
        <button
          onClick={() => setIsZoomed(true)}
          title="Expand graph"
          style={btnStyle}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      )}
    </div>
  );
}

const btnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.9)",
  border: "1px solid #ddd",
  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#555",
  padding: 0,
  zIndex: 10,
  pointerEvents: "auto",
};
