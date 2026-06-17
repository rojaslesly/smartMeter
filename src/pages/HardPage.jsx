import { useState, useCallback } from "react";
import PowerQualityTable from "../features/PowerQualityTable";
import PowerQualityGraph from "../features/PowerQualityGraph";
import NetworkStatusCard from "../features/NodesGraph";
import PQGraph24h from "../features/PQGraph24h";
import LastOutageCard from "../features/LastOutageCard";
import GlobalStateCard from "../features/GlobalStateCard";
import LiveRefreshBar from "../components/LiveRefreshBar";
import { useBus24h, useGlobalGridState } from "../hooks/useGridData";
import { pqToPercent, utcNow } from "../utils/gridData";

const TAB_BUS    = "bus";
const TAB_GLOBAL = "global";

function deriveAreaState(pqPct) {
  if (pqPct <= 20) return "Critical";
  if (pqPct <= 50) return "Heavy Load";
  if (pqPct <= 80) return "Normal Load";
  return "Ideal";
}

export default function HardPage() {
  const [targetTime, setTargetTime] = useState(utcNow);
  const [activeTab, setActiveTab] = useState(TAB_BUS);
  const [spinning, setSpinning] = useState(false);

  const { rows, isLoading: graphLoading } = useBus24h(6, targetTime);
  const { data: globalState, isLoading: globalLoading } = useGlobalGridState(targetTime);

  const handleRefresh = useCallback(() => {
    setSpinning(true);
    setTargetTime(utcNow());
    setTimeout(() => setSpinning(false), 800);
  }, []);

  const areaState = globalState
    ? deriveAreaState(pqToPercent(globalState.power_quality))
    : "Stable";

  const graphData = { rows };

  return (
    <div>
      <LiveRefreshBar
        isLive={!graphLoading && rows.length > 0}
        isLoading={graphLoading || globalLoading}
        onRefresh={handleRefresh}
        spinning={spinning}
      />

      <div style={tabBarStyle}>
        <button style={activeTab === TAB_BUS ? activeTabStyle : tabStyle} onClick={() => setActiveTab(TAB_BUS)}>
          Your Home
        </button>
        <button style={activeTab === TAB_GLOBAL ? activeTabStyle : tabStyle} onClick={() => setActiveTab(TAB_GLOBAL)}>
          Global State
        </button>
      </div>

      {activeTab === TAB_BUS && (
        <>
          <LastOutageCard gridData={graphData} />

          <div style={{ height: "24px" }} />

          <div
            style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", gap: "16px" }}
            className="graph-carousel"
          >
            <div style={{ minWidth: "85%", scrollSnapAlign: "center", margin: "0 auto" }}>
              <PowerQualityGraph gridData={graphData} isLoading={graphLoading} />
            </div>
            <div style={{ minWidth: "85%", scrollSnapAlign: "center", margin: "0 auto" }}>
              <PQGraph24h gridData={graphData} isLoading={graphLoading} />
            </div>
          </div>

          <div style={{ margin: "20px" }} />

          <PowerQualityTable rows={rows} />
          <NetworkStatusCard areaState={areaState} />
        </>
      )}

      {activeTab === TAB_GLOBAL && (
        <div style={{ marginTop: "16px" }}>
          <GlobalStateCard data={globalState} />
        </div>
      )}
    </div>
  );
}

const tabStyle = {
  flex: 1, padding: "10px 0", fontSize: "14px", fontWeight: "600",
  borderTop: "1px solid #ddd", borderRight: "1px solid #ddd",
  borderBottom: "1px solid #ddd", borderLeft: "1px solid #ddd",
  borderRadius: "8px", background: "#f5f5f5", color: "#555",
  cursor: "pointer", outline: "none", appearance: "none", WebkitAppearance: "none",
};

const tabBarStyle = { display: "flex", gap: "8px", marginBottom: "4px" };
const activeTabStyle = { ...tabStyle, background: "#fff", color: "#111", borderBottom: "2px solid #2563eb" };
