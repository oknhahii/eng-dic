import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Lượng từ mới học được</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Thời gian tính từ ngày 04/11"
            },
            legend: {
              display: true 
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;