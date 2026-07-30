import api from "./api";

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
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get("/dashboard/stats");
    return response.data;
};