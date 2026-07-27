from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_products: int
    total_customers: int
    total_orders: int
    total_revenue: float
    low_stock_items: int
    out_of_stock_items: int
    pending_orders: int
    stock_value: float