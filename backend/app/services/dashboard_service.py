from collections import defaultdict
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order


def get_dashboard_stats(db: Session):

    # -------------------------
    # Basic Stats
    # -------------------------
    total_products = db.query(Product).count()

    total_customers = db.query(Customer).count()

    total_orders = db.query(Order).count()

    low_stock = (
        db.query(Product)
        .filter(Product.stock_quantity <= Product.reorder_threshold)
        .count()
    )

    inventory_value = (
        db.query(
            func.sum(
                Product.purchase_price *
                Product.stock_quantity
            )
        ).scalar()
        or 0
    )

    total_categories = (
        db.query(Product.category)
        .distinct()
        .count()
    )

    total_revenue = (
        db.query(func.sum(Order.total_amount))
        .scalar()
        or 0
    )

    completed_orders = (
        db.query(Order)
        .filter(Order.status == "Completed")
        .count()
    )

    pending_orders = (
        db.query(Order)
        .filter(Order.status == "Pending")
        .count()
    )

    # -------------------------
    # Monthly Sales
    # -------------------------
    monthly_sales_map = defaultdict(float)

    all_orders = db.query(Order).all()

    for order in all_orders:
        month = order.order_date.strftime("%b")
        monthly_sales_map[month] += order.total_amount

    monthly_sales = [
        {
            "month": month,
            "sales": amount
        }
        for month, amount in monthly_sales_map.items()
    ]

    # -------------------------
    # Top Selling Products
    # -------------------------
    product_sales = defaultdict(int)

    for order in all_orders:
        product_sales[order.product_id] += order.quantity

    top_products = []

    for product_id, qty in sorted(
        product_sales.items(),
        key=lambda x: x[1],
        reverse=True
    )[:5]:

        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if product:
            top_products.append({
                "name": product.name,
                "quantity": qty
            })

    # -------------------------
    # Low Stock Products
    # -------------------------
    low_stock_products = []

    products = (
        db.query(Product)
        .filter(Product.stock_quantity <= Product.reorder_threshold)
        .all()
    )

    for product in products:
        low_stock_products.append({
            "name": product.name,
            "stock": product.stock_quantity
        })

    # -------------------------
    # Order Status
    # -------------------------
    order_status = [
        {
            "status": "Completed",
            "count": completed_orders
        },
        {
            "status": "Pending",
            "count": pending_orders
        }
    ]

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock": low_stock,
        "inventory_value": inventory_value,
        "total_categories": total_categories,
        "total_revenue": total_revenue,
        "completed_orders": completed_orders,
        "pending_orders": pending_orders,
        "monthly_sales": monthly_sales,
        "top_products": top_products,
        "low_stock_products": low_stock_products,
        "order_status": order_status,
    }