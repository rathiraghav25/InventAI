from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime


class CustomerBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(CustomerBase):
    pass


class CustomerResponse(CustomerBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)