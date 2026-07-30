import api from "./api";

export interface MonthlySale {
  month: string;
  sales: number;
}

export interface OrderStatus {
  status: string;
  count: number;
}

export interface TopProduct {
  name: string;
  quantity: number;
}

export interface LowStockProduct {
  name: string;
  stock: number;
}

export interface DashboardStats {
  total_products: number;
  total_customers: number;
  total_orders: number;
  low_stock: number;
  inventory_value: number;
  total_categories: number;
  total_revenue: number;
  completed_orders: number;
  pending_orders: number;

  monthly_sales: MonthlySale[];
  order_status: OrderStatus[];
  top_products: TopProduct[];
  low_stock_products: LowStockProduct[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};