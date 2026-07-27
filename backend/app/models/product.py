import uuid

from sqlalchemy import Column, String, Float, Integer, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    name = Column(String, nullable=False)

    sku = Column(String, unique=True, nullable=False)

    category = Column(String, nullable=False)

    description = Column(String, nullable=True)

    purchase_price = Column(Float, nullable=False)

    selling_price = Column(Float, nullable=False)

    stock_quantity = Column(Integer, default=0)

    reorder_threshold = Column(Integer, default=5)

    created_at = Column(DateTime(timezone=True), server_default=func.now())