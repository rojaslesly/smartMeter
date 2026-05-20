import ChargeForecast from "../features/ChargeForecast";
import Dial_PQ from "../features/PQDial";
import { useState } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
import AreaForecast from "../features/AreaForecast";
import ApplianceCarousel from "../features/ApplianceCarousel";
import { useGridData } from "../hooks/useGridData";

//import PQStatusCard from "../features/ChargeForecast";
export default function EasyPage() {
  const [pq, setPq] = useState(65);
  // Use UTC formatting to match DB expected `YYYY-MM-DD HH:mm:ss`
  const [targetTime] = useState(() => dayjs().utc().format('YYYY-MM-DD HH:mm:ss'));
  const { data, isLoading, error } = useGridData(6, targetTime);
 // const status = useMemo(() => ChargeForecast(pq), [pq]);
  return (
    <div>

      <Dial_PQ onValueChange={setPq} />
      <ChargeForecast pq={pq} />
      <AreaForecast />
      <div className="grid-data-viewer">
        <h3>Grid Data</h3>
        {isLoading ? (
          <p>Loading grid data…</p>
        ) : error ? (
          <div style={{ color: 'crimson' }}>Error: {error.message}</div>
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap' }}>{data ? JSON.stringify(data, null, 2) : 'No data'}</pre>
        )}
      </div>
      <ApplianceCarousel />


    </div>
    
  );
}