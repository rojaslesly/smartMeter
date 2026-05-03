import ChargeForecast from "../features/ChargeForecast";
import Dial_PQ from "../features/PQDial";
import { useState } from "react";
import AreaForecast from "../features/AreaForecast";
import ApplianceCarousel from "../features/ApplianceCarousel";

//import PQStatusCard from "../features/ChargeForecast";
export default function EasyPage() {
  const [pq, setPq] = useState(65);
 // const status = useMemo(() => ChargeForecast(pq), [pq]);
  return (
    <div>

      <Dial_PQ onValueChange={setPq} />
      <ChargeForecast pq={pq} />
      <AreaForecast />
      <ApplianceCarousel />


    </div>
    
  );
}