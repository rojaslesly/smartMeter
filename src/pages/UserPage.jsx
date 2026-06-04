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
          <button style={styles.button}>Edit Goal</button>
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
  
    button: {
      marginTop: "10px",
      padding: "10px 14px",
      borderRadius: "12px",
      border: "none",
      background: "#111",
      color: "#fff",
      cursor: "pointer",
    },
  };