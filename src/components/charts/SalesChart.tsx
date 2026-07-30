import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlySale {
  month: string;
  sales: number;
}

interface SalesChartProps {
  data: MonthlySale[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <div className="card">
      <h3 style={{ marginBottom: "1rem" }}>Monthly Sales</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
                formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "Sales",
                ]}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;