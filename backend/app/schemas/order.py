from pydantic import BaseModel, ConfigDict
from datetime import datetime


class OrderCreate(BaseModel):
    customer_id: str
    product_id: str
    quantity: int


class OrderUpdate(BaseModel):
    status: str


class OrderResponse(BaseModel):
    id: str
    customer_id: str
    product_id: str
    quantity: int
    total_amount: float
    status: str
    order_date: datetime

    model_config = ConfigDict(from_attributes=True)