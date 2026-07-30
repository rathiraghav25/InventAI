import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TopProduct {
  name: string;
  quantity: number;
}

interface TopProductsChartProps {
  data: TopProduct[];
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => {
  return (
    <div className="analytics-card">
      <h3 style={{ marginBottom: "1rem" }}>
        Top Selling Products
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `${Number(value)} units`,
              "Sold",
            ]}
          />

          <Bar
            dataKey="quantity"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsChart;