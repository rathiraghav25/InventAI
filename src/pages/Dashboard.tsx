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
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, here is your business summary today.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary" onClick={() => navigate('/orders')}>
            <Plus size={18} /> Create Order
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/inventory')}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>
          <MetricCard 
            title="Today's Sales"
            value={formatINR(stats.total_revenue)} 
            icon={<IndianRupee size={24} />} 
            trend="View analytics" 
            trendUp={true} 
          />
        </div>
        <div onClick={() => navigate('/orders')} style={{ cursor: 'pointer' }}>
          <MetricCard
              title="Total Products"
              value={stats.total_products.toString()}
              icon={<CheckCircle size={24} />}
              trend={`${stats.total_categories} Categories`}
          />
        </div>
        <div onClick={() => navigate('/inventory')} style={{ cursor: 'pointer' }}>
          <MetricCard 
            title="Stock Value" 
            value={formatINR(stats.inventory_value)} 
            icon={<TrendingUp size={24} />} 
            trend="View inventory"
          />
        </div>
        <div onClick={() => navigate('/inventory')} style={{ cursor: 'pointer' }}>
          <MetricCard 
            title="Low Stock Items" 
            value={stats.low_stock.toString()} 
            icon={<AlertTriangle size={24} color="#f59e0b" />} 
            trend="Needs Attention"
            trendUp={false}
          />
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <h3 style={{ width: '100%', fontSize: '1rem', margin: '0 0 0.5rem 0.5rem' }}>Quick Actions</h3>
        <button className="btn btn-ghost" onClick={() => navigate('/inventory')} style={{ flex: 1, justifyContent: 'center' }}>
          <Plus size={16} /> Add Product
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/orders')} style={{ flex: 1, justifyContent: 'center' }}>
          <FileText size={16} /> New Order
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/invoices')} style={{ flex: 1, justifyContent: 'center' }}>
          <IndianRupee size={16} /> Bill & Invoice
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/analytics')} style={{ flex: 1, justifyContent: 'center' }}>
          <BarChart3 size={16} /> View Reports
        </button>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
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
      style={{
        fontSize: "0.875rem",
        padding: "0.25rem 0.5rem",
      }}
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
        {orders.slice(0, 5).map((order) => (
          <tr
            key={order.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/orders")}
          >
            <td>{order.id.slice(0, 8)}</td>

            <td>
              {new Date(
                order.order_date
              ).toLocaleDateString()}
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

            <td>
              {formatINR(order.total_amount)}
            </td>
          </tr>
        ))}

        {orders.length === 0 && (
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

<div style={{ marginTop: "1.5rem" }}>
  <SalesChart data={stats.monthly_sales} />
</div>

<div style={{ marginTop: "1.5rem" }}>
  <TopProductsChart
    data={stats.top_products}
  />
</div>

        <div className="content-right">

  <OrdersPieChart
    data={stats.order_status}
  />

  <div style={{ marginTop: "1.5rem" }}>
    <LowStockTable
      data={stats.low_stock_products}
    />
  </div>

  <div
    className="card"
    style={{ marginTop: "1.5rem" }}
  >
    <h3>Business Summary</h3>

    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div>
        💰 <strong>Total Revenue:</strong>{" "}
        {formatINR(stats.total_revenue)}
      </div>

      <div>
        📦 <strong>Total Orders:</strong>{" "}
        {stats.total_orders}
      </div>

      <div>
        👥 <strong>Total Customers:</strong>{" "}
        {stats.total_customers}
      </div>

      <div>
        📂 <strong>Total Categories:</strong>{" "}
        {stats.total_categories}
      </div>

      <div>
        ⚠ <strong>Low Stock Products:</strong>{" "}
        {stats.low_stock}
      </div>
    </div>
  </div>

</div>
      </div>
    </div>
    </div>
  );
};
