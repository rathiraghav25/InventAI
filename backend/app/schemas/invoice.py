from datetime import datetime
from pydantic import BaseModel


class InvoiceBase(BaseModel):
    order_id: str
    customer_id: str
    total_amount: float


class InvoiceCreate(InvoiceBase):
    pass


class InvoiceUpdate(BaseModel):
    payment_status: str


class InvoiceResponse(InvoiceBase):
    id: str
    payment_status: str
    invoice_date: datetime

    class Config:
        from_attributes = True