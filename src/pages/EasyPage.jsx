import ChargeForecast from "../features/ChargeForecast";
import Dial_PQ from "../features/PQDial";
import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import AreaForecast from "../features/AreaForecast";
import ApplianceCarousel from "../features/ApplianceCarousel";
import { useGridData } from "../hooks/useGridData";
import { pqToPercent } from "../utils/gridData";

function now() { return dayjs().utc().format("YYYY-MM-DD HH:mm:ss"); }

export default function EasyPage() {
  const [pq, setPq] = useState(65);
  const [targetTime, setTargetTime] = useState(now);
  const [spinning, setSpinning] = useState(false);

  const { data, isLoading } = useGridData(6, targetTime);

  useEffect(() => {
    const id = setInterval(() => setTargetTime(now()), 30000);
    return () => clearInterval(id);
  }, []);

  const handleRefresh = useCallback(() => {
    setSpinning(true);
    setTargetTime(now());
    setTimeout(() => setSpinning(false), 800);
  }, []);

  const isLive = !isLoading && !!data;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#888" }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: isLive ? "#22c55e" : "#d1d5db",
            display: "inline-block",
          }} />
          {isLoading ? "Updating…" : isLive ? "Live" : "No data"}
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
      <Dial_PQ pq={pqToPercent(data?.power_quality)} onValueChange={setPq} recordTime={data?.record_time} />
      <ChargeForecast pq={pq} />
      <AreaForecast />
      <ApplianceCarousel />
    </div>
  );
}
