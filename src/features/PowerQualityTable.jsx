import { useEffect, useState } from "react";
import pqData from "../data/pqDataTable.json"; 

export default function PowerQualityTable() {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const columns = [
    { key: "time", label: "Time" },
    { key: "powerQuality", label: "Power Quality" },
    { key: "outageState", label: "Outage State" },
    { key: "voltage", label: "Voltage" },
    { key: "frequency", label: "Frequency" },
  ];

  useEffect(() => {
    setData(pqData.data);
    setLastUpdated(pqData.lastUpdated);
  }, []);

  return (
    <div>
      <h2>Power Quality Data</h2>

      <p>
        Last Updated:{" "}
        {lastUpdated
          ? new Date(lastUpdated).toLocaleString()
          : "Loading..."}
      </p>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
