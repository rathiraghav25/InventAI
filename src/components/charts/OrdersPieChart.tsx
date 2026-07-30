import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface OrderStatus {
  status: string;
  count: number;
}

interface OrdersPieChartProps {
  data: OrderStatus[];
}

const COLORS = [
  "#22c55e", // Completed
  "#f59e0b", // Pending
  "#ef4444", // Others
];

const OrdersPieChart: React.FC<OrdersPieChartProps> = ({ data }) => {
  return (
    <div className="analytics-card">
      <h3 style={{ marginBottom: "1rem" }}>Order Status</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersPieChart;