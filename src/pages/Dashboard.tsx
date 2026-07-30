import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../components/MetricCard';
import { IndianRupee, AlertTriangle, CheckCircle, TrendingUp, Plus, FileText, BarChart3 } from 'lucide-react';
import './Dashboard.css';
import { useEffect, useState } from "react";
import {
  getDashboardStats,
  type DashboardStats,
} from "../api/dashboard";
import { getProducts } from "../api/product";
import { getOrders } from "../api/order";
import SalesChart from "../components/charts/SalesChart";
import OrdersPieChart from "../components/charts/OrdersPieChart";
import TopProductsChart from "../components/charts/TopProductsChart";
import LowStockTable from "../components/charts/LowStockTable";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState<DashboardStats>({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    low_stock: 0,
    inventory_value: 0,
    total_categories: 0,
    total_revenue: 0,
    completed_orders: 0,
    pending_orders: 0,

    monthly_sales: [],
    top_products: [],
    low_stock_products: [],
    order_status: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, productsData, ordersData] =
          await Promise.all([
            getDashboardStats(),
            getProducts(),
            getOrders(),
          ]);

        setStats(statsData);
        setProducts(productsData);
        setOrders(ordersData);
        setNotifications([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          fontSize: "20px",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
  <div className="dashboard-page">
    <div
      className="page-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Dashboard Overview</h1>
        <p>Welcome back, here is your business summary today.</p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/orders")}
        >
          <Plus size={18} />
          {" "}Create Order
        </button>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/inventory")}
        >
          <Plus size={18} />
          {" "}Add Product
        </button>
      </div>
    </div>

    {/* KPI Cards */}

    <div className="metrics-grid">
      <MetricCard
        title="Total Revenue"
        value={formatINR(stats.total_revenue)}
        icon={<IndianRupee size={24} />}
        trend={`${stats.completed_orders} Completed Orders`}
        trendUp
      />

      <MetricCard
        title="Total Orders"
        value={stats.total_orders.toString()}
        icon={<FileText size={24} />}
        trend={`${stats.pending_orders} Pending`}
        trendUp={stats.pending_orders === 0}
      />

      <MetricCard
        title="Customers"
        value={stats.total_customers.toString()}
        icon={<CheckCircle size={24} />}
        trend={`${stats.total_categories} Categories`}
        trendUp
      />

      <MetricCard
        title="Inventory Value"
        value={formatINR(stats.inventory_value)}
        icon={<TrendingUp size={24} />}
        trend={`${stats.low_stock} Low Stock`}
        trendUp={stats.low_stock === 0}
      />
    </div>

    {/* Analytics */}

    <div className="analytics-grid">
      <SalesChart data={stats.monthly_sales} />

      <OrdersPieChart data={stats.order_status} />

      <TopProductsChart data={stats.top_products} />

      <LowStockTable data={stats.low_stock_products} />
    </div>

    {/* Recent Orders */}

    <div className="analytics-full">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Recent Orders</h3>

          <button
            className="btn btn-ghost"
            onClick={() => navigate("/orders")}
          >
            View All
          </button>
        </div>

        <div
          className="table-container"
          style={{ marginTop: "1rem" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/orders")}
                  >
                    <td>{order.id.slice(0, 8)}</td>

                    <td>
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`badge badge-${
                          order.status === "Completed"
                            ? "success"
                            : order.status === "Pending"
                            ? "warning"
                            : "info"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>{formatINR(order.total_amount)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                    }}
                  >
                    No recent orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
 );
};
