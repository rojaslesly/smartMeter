import PowerQualityTable from "../features/PowerQualityTable";
import PowerQualityGraph from "../features/PowerQualityGraph";
import NetworkStatusCard from "../features/NodesGraph";
import VoltageGraph from "../features/VoltageGraph";

export default function HardPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          gap: "16px",
        }}
        className="graph-carousel"
      >
        <div
          style={{
            minWidth: "85%",
            scrollSnapAlign: "center",
            margin: "0 auto",
          }}
        >
          <PowerQualityGraph />
        </div>

        <div
          style={{
            minWidth: "85%",
            scrollSnapAlign: "center",
            margin: "0 auto",
          }}
        >
          <VoltageGraph />
        </div>
      </div>

      <div style={{ margin: "20px" }} />

      <NetworkStatusCard areaState="Stable" />
    </div>
  );
}