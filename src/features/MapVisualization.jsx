import { useEffect } from "react";

export default function MapVisualization() {
  useEffect(() => {
    if (document.querySelector('script[data-arcgis-embed]')) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://js.arcgis.com/5.0/embeddable-components/";
    script.dataset.arcgisEmbed = "true";
    document.head.appendChild(script);
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Ideal Poland Grid Structure</h3>
      <arcgis-embedded-map
        style={{ width: "430px", height: "420px", display: "block" }}
        item-id="ea43092f0f24417f9d8a202b54748388"
        legend-enabled="false"
        time-zone-label-enabled="true"
        center="19.550129024798764,51.927339280513806"
        scale="14978595"
        portal-url="https://osugisci.maps.arcgis.com"
        disable-sign-in=""
      />
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "16px",
    padding: "0",
    width: "calc(100% + 40px)",
    marginLeft: "-20px",
    marginRight: "-20px",
    boxSizing: "border-box",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    marginTop: "16px",
    marginBottom: "16px",
    overflow: "hidden",
  },
  title: {
    textAlign: "left",
    padding: "12px 12px 8px 12px",
    margin: "0",
    fontSize: "16px",
    fontWeight: "700",
    color: "#111",
    lineHeight: "140%",
  },
};
