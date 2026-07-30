from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.product import Product
from app.models.customer import Customer
from app.models.invoice import Invoice
from app.models.invoice import Invoice
from app.schemas.order import OrderCreate, OrderUpdate


def get_orders(db: Session):
    return db.query(Order).all()


def get_order(db: Session, order_id: str):
    return db.query(Order).filter(Order.id == order_id).first()


def create_order(db: Session, order: OrderCreate):

    customer = (
        db.query(Customer)
        .filter(Customer.id == order.customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found."
        )

    product = (
        db.query(Product)
        .filter(Product.id == order.product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found."
        )

    if product.stock_quantity < order.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock."
        )

    total_amount = product.selling_price * order.quantity

    product.stock_quantity -= order.quantity

    db_order = Order(
        customer_id=order.customer_id,
        product_id=order.product_id,
        quantity=order.quantity,
        total_amount=total_amount,
        status="Pending"
    )

    db.add(db_order)

    try:
        db.commit()
        db.refresh(db_order)

        db_invoice = Invoice(
            order_id=db_order.id,
            customer_id=db_order.customer_id,
            total_amount=db_order.total_amount,
            payment_status="Unpaid",
        )

        db.add(db_invoice)
        db.commit()

    except Exception:
        db.rollback()
        raise

    return db_order


def update_order(db: Session, order_id: str, order: OrderUpdate):

    db_order = get_order(db, order_id)

    if not db_order:
        return None

    db_order.status = order.status

    try:
        db.commit()
        db.refresh(db_order)
    except Exception:
        db.rollback()
        raise

    return db_order

def delete_order(db: Session, order_id: str):

    db_order = get_order(db, order_id)

    if not db_order:
        return None

    product = (
        db.query(Product)
        .filter(Product.id == db_order.product_id)
        .first()
    )

    if product:
        product.stock_quantity += db_order.quantity

    invoice = (
        db.query(Invoice)
        .filter(Invoice.order_id == db_order.id)
        .first()
    )

    if invoice:
        db.delete(invoice)

    try:
        db.delete(db_order)
        db.commit()
    except Exception:
        db.rollback()
        raise

    return db_order