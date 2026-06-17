const BUILD_YEAR = 2026;

import gridPingLogo from '../assets/GridPing.png';

export default function UserPage() {
    return (
      <div style={styles.page}>
        <h2 style={styles.title}>User Settings</h2>
  
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Profile</h3>
          <p style={styles.text}>Home Type: Apartment</p>
        </div>
  
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Energy Goal</h3>
          <p style={styles.text}>Reduce energy use during peak hours.</p>
        </div>
  
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Alerts</h3>
          <label style={styles.row}>
            <span>Power quality warnings</span>
            <input type="checkbox" defaultChecked />
          </label>
  
          <label style={styles.row}>
            <span>Outage notifications</span>
            <input type="checkbox" defaultChecked />
          </label>
  
          <label style={styles.row}>
            <span>High appliance usage</span>
            <input type="checkbox" />
          </label>
        </div>
  
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>App Preferences</h3>
          <label style={styles.row}>
            <span>Default to Simple Mode</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        {/* Attributions */}
        <div style={styles.attribution}>
          <img src={gridPingLogo} alt="GridPing" style={styles.attrLogo} />
          <p style={styles.attrDesc}>
            Real-time power quality monitoring for your home, powered by smart meter hardware and cloud analytics.
          </p>

          <div style={styles.attrDivider} />

          <p style={styles.attrLabel}>Built with</p>
          <div style={styles.attrPills}>
            {["React", "Vite", "AWS Lambda", "PostgreSQL"].map((t) => (
              <span key={t} style={styles.pill}>{t}</span>
            ))}
          </div>

          <div style={styles.attrDivider} />

          <p style={styles.attrLabel}>Data source</p>
          <p style={styles.attrMeta}>
            Smart meter telemetry simulated live on Jetson-based edge hardware and ingested through AWS IoT.
          </p>

          <div style={styles.attrDivider} />

          <a href="https://gridping.vercel.app" target="_blank" rel="noreferrer" style={styles.attrLink}>
            gridping.vercel.app ↗
          </a>

          <p style={styles.attrCopy}>© {BUILD_YEAR} GridPing — Demo build</p>
        </div>
      </div>
    );
  }
  
  const styles = {
    page: {
      width: "100%",
      boxSizing: "border-box",
      paddingBottom: "80px",
    },
  
    title: {
      fontSize: "24px",
      marginBottom: "16px",
    },
  
    card: {
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "16px",
      padding: "16px",
      marginBottom: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
  
    cardTitle: {
      margin: "0 0 10px 0",
      fontSize: "18px",
    },
  
    text: {
      margin: "6px 0",
      color: "#444",
    },
  
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0",
      borderTop: "1px solid #eee",
      fontSize: "14px",
    },
  
    attribution: {
      marginTop: "8px",
      marginBottom: "24px",
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #e8e8e8",
      background: "#fafafa",
      textAlign: "center",
    },

    attrLogo: {
      height: "28px",
      width: "auto",
      marginBottom: "8px",
      display: "block",
      margin: "0 auto 8px auto",
    },

    attrDesc: {
      fontSize: "13px",
      color: "#555",
      lineHeight: "1.6",
      margin: "0 0 12px 0",
    },

    attrDivider: {
      height: "1px",
      background: "#eee",
      margin: "12px 0",
    },

    attrLabel: {
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.6px",
      color: "#999",
      margin: "0 0 8px 0",
    },

    attrPills: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "6px",
      marginBottom: "4px",
    },

    pill: {
      fontSize: "12px",
      padding: "4px 10px",
      borderRadius: "20px",
      background: "#efefef",
      color: "#444",
      fontWeight: "500",
    },

    attrMeta: {
      fontSize: "12px",
      color: "#666",
      lineHeight: "1.6",
      margin: "0",
    },

    attrLink: {
      display: "inline-block",
      fontSize: "13px",
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "600",
      marginBottom: "10px",
    },

    attrCopy: {
      fontSize: "11px",
      color: "#bbb",
      margin: "0",
    },
  };