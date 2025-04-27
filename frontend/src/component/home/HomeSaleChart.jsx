import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Sale Summary By Month",
  hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "80%", height: "70%" },
};

function HomeSaleChart({ data = [] }) {
  if (data == null || data.length == 0) return null;
  return (
    <div>
      <div
        style={{
          backgroundColor: "#EEE",
          padding: 15,
          margin: 5,
          borderRadius: 10,
          minHeight: 100,
        }}
      >
        <Chart
          chartType="LineChart" //"ColumnChart" //"AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default HomeSaleChart;
