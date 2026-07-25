from pydantic import BaseModel, EmailStr
from pydantic import Field

password: str = Field(min_length=6)

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str