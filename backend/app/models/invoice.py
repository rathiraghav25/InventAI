from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
import uuid

from app.db.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    order_id = Column(
        String,
        ForeignKey("orders.id"),
        nullable=False,
        unique=True,
    )

    customer_id = Column(
        String,
        ForeignKey("customers.id"),
        nullable=False,
    )

    total_amount = Column(
        Float,
        nullable=False,
    )

    payment_status = Column(
        String,
        default="Unpaid",
        nullable=False,
    )

    invoice_date = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )