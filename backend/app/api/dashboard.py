from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import get_db
from app.models.product import Product

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_products = db.query(Product).count()

    low_stock = (
        db.query(Product)
        .filter(Product.stock_quantity <= Product.reorder_threshold)
        .count()
    )

    inventory_value = (
        db.query(
            func.sum(Product.purchase_price * Product.stock_quantity)
        ).scalar()
        or 0
    )

    total_categories = (
        db.query(Product.category)
        .distinct()
        .count()
    )

    return {
        "total_products": total_products,
        "low_stock": low_stock,
        "inventory_value": inventory_value,
        "total_categories": total_categories,
    }