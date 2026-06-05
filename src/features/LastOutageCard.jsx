
export default function LastOutageCard({ gridData }) {
    const rows = Array.isArray(gridData?.rows) ? gridData.rows : [];
  
    const lastOutage = rows
      .filter((row) => Number(row.power_quality) < 0)
      .sort((a, b) => new Date(b.record_time) - new Date(a.record_time))[0];
  
    const outageDate = lastOutage
      ? new Date(lastOutage.record_time).toLocaleString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "No recent outage";
  
    return (
      <div style={styles.card}>
        <p style={styles.label}>Last Area Outage</p>
        <h2 style={styles.time}>{outageDate}</h2>
        <p style={styles.description}>
          Outage detected when power quality dropped below 0
        </p>
      </div>
    );
  }
  
  const styles = {
    card: {
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "16px",
      padding: "20px",
      width: "100%",
      boxSizing: "border-box",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      marginTop: "20px",
    
    },
    label: {
      margin: 0,
      fontSize: "14px",
      color: "#666",
    },
    time: {
      margin: "6px 0",
      fontSize: "22px",
      color: "#111",
    },
    description: {
      margin: 0,
      fontSize: "13px",
      color: "#777",
    },
  };