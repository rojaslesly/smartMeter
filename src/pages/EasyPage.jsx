import ChargeForecast from "../features/ChargeForecast";
import Dial_PQ from "../features/PQDial";
import { useState, useEffect } from "react";
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
  const [targetTime, setTargetTime] = useState(() => dayjs().utc().format('YYYY-MM-DD HH:mm:ss'));
  const { data, error } = useGridData(6, targetTime);

  useEffect(() => {
    const id = setInterval(() => {
      setTargetTime(dayjs().utc().format('YYYY-MM-DD HH:mm:ss'));
    }, 30000);
    return () => clearInterval(id);
  }, []);

 // const status = useMemo(() => ChargeForecast(pq), [pq]);
  return (
    <div>

      {/* <Dial_PQ onValueChange={setPq} /> */}
      <Dial_PQ pq={data?.power_quality ?? 0} onValueChange={setPq} />
      <ChargeForecast pq={pq} />
      <AreaForecast />
      <pre>{error ? error.message : JSON.stringify(data)}</pre>
      <ApplianceCarousel />


    </div>
    
  );
}