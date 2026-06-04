import { useEffect, useState } from 'react';
import pqData from '../data/pqDataTable.json';

export default function PowerQualityTable() {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  const columns = [
    { key: 'time', label: 'Time' },
    { key: 'powerQuality', label: 'Power Quality' },
    { key: 'outageState', label: 'Outage State' },
    { key: 'voltage', label: 'Voltage' },
    { key: 'frequency', label: 'Frequency' },
  ];

  useEffect(() => {
    setData(pqData.data);
    setLastUpdated(pqData.lastUpdated);
  }, []);

  return (
    
    <div>
    <h2>Power Quality Data</h2>
  
    <p>
      Last Updated:{' '}
      {lastUpdated
        ? new Date(lastUpdated).toLocaleString()
        : 'Loading...'}
    </p>
  
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table

        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "6px",
          fontSize: "11px",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  backgroundColor: "#b8b8b8",
                  color: "black",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
  
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td
                  key={col.key}
                  style={{
                    backgroundColor:
                      colIndex === 0 ? "#b8b8b8" : "#b8b8b8",
                    color:
                      colIndex === 0 ? "black" : "black",
                    fontWeight:
                      colIndex === 0 ? "bold" : "normal",
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    
  );
  
}

