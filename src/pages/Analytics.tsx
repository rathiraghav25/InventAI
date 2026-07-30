import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import api from "../api/api";

const COLORS = [
  "#162a5c",
  "#d4af37",
  "#10b981",
  "#ef4444",
  "#f59e0b",
];

interface MonthlySale {
  month: string;
  revenue: number;
}

interface TopProduct {
  name: string;
  quantity: number;
}

interface LowStockProduct {
  name: string;
  stock: number;
}

interface OrderStatus {
  status: string;
  count: number;
}

interface AnalyticsData {
  total_products: number;
  total_customers: number;
  total_orders: number;
  low_stock: number;
  inventory_value: number;
  total_revenue: number;
  completed_orders: number;
  pending_orders: number;

  monthly_sales: MonthlySale[];
  top_products: TopProduct[];
  low_stock_products: LowStockProduct[];
  order_status: OrderStatus[];
}

export const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await api.get("/dashboard/stats");

        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          fontSize: "20px",
        }}
      >
        Loading Analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="page-container">
        Failed to load analytics.
      </div>
    );
  }
    return (
    <div className="page-container">

      <h1
        style={{
          marginBottom: "2rem",
          color: "var(--color-primary-dark)",
        }}
      >
        Business Analytics
      </h1>

      <div
        className="grid grid-cols-4"
        style={{ marginBottom: "2rem" }}
      >

        <div className="card">
          <Package size={28} />
          <h2>{analytics.total_products}</h2>
          <p>Total Products</p>
        </div>

        <div className="card">
          <ShoppingCart size={28} />
          <h2>{analytics.total_orders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="card">
          <TrendingUp size={28} />
          <h2>
            ₹{analytics.total_revenue.toLocaleString()}
          </h2>
          <p>Total Revenue</p>
        </div>

        <div className="card">
          <AlertTriangle size={28} />
          <h2>{analytics.low_stock}</h2>
          <p>Low Stock Products</p>
        </div>

      </div>

      <div
        className="grid grid-cols-2"
        style={{
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >

        <div
          className="card"
          style={{ height: 380 }}
        >
          <h3>Monthly Sales</h3>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={analytics.monthly_sales}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#162a5c"
                fill="#162a5c33"
              />
            </AreaChart>
          </ResponsiveContainer>

        </div>

        <div
          className="card"
          style={{ height: 380 }}
        >
          <h3>Order Status</h3>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={analytics.order_status}
                dataKey="count"
                nameKey="status"
                outerRadius={110}
                label
              >
                {analytics.order_status.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div
        className="grid grid-cols-2"
        style={{ gap: "2rem" }}
      >

        <div
          className="card"
          style={{ height: 380 }}
        >
          <h3>Top Products</h3>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={analytics.top_products}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="quantity"
                fill="#162a5c"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
                <div
          className="card"
          style={{ height: 380 }}
        >
          <h3>Low Stock Products</h3>

          <div
            style={{
              marginTop: "1rem",
              overflowY: "auto",
              maxHeight: "300px",
            }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {analytics.low_stock_products.map(
                  (product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>
                        <span
                          className="badge badge-danger"
                        >
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div
        className="grid grid-cols-3"
        style={{
          marginTop: "2rem",
          gap: "1.5rem",
        }}
      >
        <div className="card">
          <h3>Inventory Value</h3>

          <h2
            style={{
              color: "var(--color-primary)",
            }}
          >
            ₹
            {analytics.inventory_value.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <h3>Completed Orders</h3>

          <h2
            style={{
              color: "#16a34a",
            }}
          >
            {analytics.completed_orders}
          </h2>
        </div>

        <div className="card">
          <h3>Pending Orders</h3>

          <h2
            style={{
              color: "#f59e0b",
            }}
          >
            {analytics.pending_orders}
          </h2>
        </div>
      </div>

    </div>
  );
};