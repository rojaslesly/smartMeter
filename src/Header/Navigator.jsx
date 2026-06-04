import { useState } from "react";

export default function Navigator() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        style={styles.menuButton}
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>

      <div
        style={{
          ...styles.overlay,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        onClick={() => setMenuOpen(false)}
      >
        <div
          style={{
            ...styles.menu,
            transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            style={styles.closeButton}
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

          <h2 style={styles.menuTitle}>GridPing</h2>

          <button style={styles.menuItem}>Dashboard</button>
          <button style={styles.menuItem}>Power Quality</button>
          <button style={styles.menuItem}>Appliances</button>
          <button style={styles.menuItem}>Grid Data</button>
          <button style={styles.menuItem}>Settings</button>
        </div>
      </div>
    </>
  );
}

const styles = {
  menuButton: {
    fontSize: "20px",
    width: "34px",
    height: "34px",
    border: "none",
    borderRadius: "10px",
    background: "#f2f2f2",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.2)",
    zIndex: 1000,
    transition: "opacity 0.25s ease",
  },

  menu: {
    width: "220px",
    height: "100%",
    background: "#fff",
    padding: "18px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "transform 0.3s ease",
  },

  closeButton: {
    alignSelf: "flex-end",
    border: "none",
    background: "none",
    fontSize: "24px",
    cursor: "pointer",
  },

  menuTitle: {
    margin: "0 0 12px",
    fontSize: "22px",
  },

  menuItem: {
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#f5f5f5",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
  },
};