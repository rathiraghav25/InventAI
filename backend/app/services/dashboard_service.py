from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order


def get_dashboard_stats(db: Session):

    total_products = db.query(Product).count()

    total_customers = db.query(Customer).count()

    total_orders = db.query(Order).count()

    low_stock = (
        db.query(Product)
        .filter(
            Product.stock_quantity <= Product.reorder_threshold
        )
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
    }