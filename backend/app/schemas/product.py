from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    name: str
    sku: str
    category: str
    description: str | None = None
    purchase_price: float
    selling_price: float
    stock_quantity: int
    reorder_threshold: int


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)