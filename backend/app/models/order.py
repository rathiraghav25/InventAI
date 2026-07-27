from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
import uuid

from app.db.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    customer_id = Column(
        String,
        ForeignKey("customers.id"),
        nullable=False
    )

    product_id = Column(
        String,
        ForeignKey("products.id"),
        nullable=False
    )

    quantity = Column(Integer, nullable=False)

    total_amount = Column(Float, nullable=False)

    status = Column(
        String,
        default="Pending"
    )

    order_date = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )