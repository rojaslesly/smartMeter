import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import PowerQualityTable from "../features/PowerQualityTable";
import PowerQualityGraph from "../features/PowerQualityGraph";
import NetworkStatusCard from "../features/NodesGraph";
import VoltageGraph from "../features/VoltageGraph";
import { useGridData } from "../hooks/useGridData";
import LastOutageCard from "../features/LastOutageCard";

dayjs.extend(utc);

export default function HardPage() {
  const [targetTime] = useState(() =>
    dayjs().utc().format("YYYY-MM-DD HH:mm:ss")
  );

  const { data } = useGridData(6, targetTime);

  return (
    <div>
      <LastOutageCard gridData={data} />

      {/* Space between outage card and graph carousel */}
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
        <div
          style={{
            minWidth: "85%",
            scrollSnapAlign: "center",
            margin: "0 auto",
          }}
        >
          <PowerQualityGraph gridData={data} />
        </div>

        <div
          style={{
            minWidth: "85%",
            scrollSnapAlign: "center",
            margin: "0 auto",
          }}
        >
          <VoltageGraph gridData={data} />
        </div>
      </div>

      <div style={{ margin: "20px" }} />

      <NetworkStatusCard areaState="Stable" />
    </div>
  );
}