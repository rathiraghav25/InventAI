from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.user import UserCreate
from app.services.auth_service import create_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    create_user(db, user)
    return {"message": "User created successfully"}