import { useState, useCallback } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import PowerQualityTable from "../features/PowerQualityTable";
import PowerQualityGraph from "../features/PowerQualityGraph";
import NetworkStatusCard from "../features/NodesGraph";
import PQGraph24h from "../features/PQGraph24h";
import LastOutageCard from "../features/LastOutageCard";
import GlobalStateCard from "../features/GlobalStateCard";
import { useBus24h, useGlobalGridState } from "../hooks/useGridData";
import { pqToPercent } from "../utils/gridData";

dayjs.extend(utc);

function now() { return dayjs().utc().format("YYYY-MM-DD HH:mm:ss"); }

function deriveAreaState(pqPct) {
  if (pqPct <= 25) return "Overload";
  if (pqPct <= 50) return "High Demand";
  if (pqPct <= 75) return "Normal Load";
  return "Low Load";
}

const TAB_BUS    = "bus";
const TAB_GLOBAL = "global";

export default function HardPage() {
  const [targetTime, setTargetTime] = useState(now);
  const [activeTab, setActiveTab] = useState(TAB_BUS);
  const [spinning, setSpinning] = useState(false);

  const { rows, isLoading: graphLoading } = useBus24h(6, targetTime);
  const { data: globalState, isLoading: globalLoading } = useGlobalGridState(targetTime);

  const handleRefresh = useCallback(() => {
    setSpinning(true);
    setTargetTime(now());
    setTimeout(() => setSpinning(false), 800);
  }, []);

  const isLive = !graphLoading && rows.length > 0;

  const areaState = globalState
    ? deriveAreaState(pqToPercent(globalState.power_quality))
    : "Stable";

  const graphData = { rows };

  return (
    <div>
      {/* Status + refresh row */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#888" }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: isLive ? "#22c55e" : "#d1d5db",
            display: "inline-block",
          }} />
          {graphLoading || globalLoading ? "Updating…" : isLive ? "Live" : "No data"}
        </span>
        <button
          onClick={handleRefresh}
          title="Refresh data"
          style={{
            background: "none", border: "1px solid #ddd", borderRadius: "8px",
            padding: "4px 8px", cursor: "pointer", fontSize: "14px", lineHeight: 1,
            display: "flex", alignItems: "center",
            transform: spinning ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s ease",
          }}
        >
          ↻
        </button>
      </div>

      {/* Tab bar */}
      <div style={tabBarStyle}>
        <button
          style={activeTab === TAB_BUS ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab(TAB_BUS)}
        >
          Your Home
        </button>
        <button
          style={activeTab === TAB_GLOBAL ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab(TAB_GLOBAL)}
        >
          Global State
        </button>
      </div>

      {activeTab === TAB_BUS && (
        <>
          <LastOutageCard gridData={graphData} />

          <div style={{ height: "24px" }} />

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

const tabBarStyle = {
  display: "flex",
  gap: "8px",
  marginBottom: "4px",
};

const tabStyle = {
  flex: 1,
  padding: "10px 0",
  fontSize: "14px",
  fontWeight: "600",
  borderTop: "1px solid #ddd",
  borderRight: "1px solid #ddd",
  borderBottom: "1px solid #ddd",
  borderLeft: "1px solid #ddd",
  borderRadius: "8px",
  background: "#f5f5f5",
  color: "#555",
  cursor: "pointer",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
};

const activeTabStyle = {
  ...tabStyle,
  background: "#fff",
  color: "#111",
  borderBottom: "2px solid #2563eb",
};
