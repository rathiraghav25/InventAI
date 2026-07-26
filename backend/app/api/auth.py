from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas.user import UserCreate
from app.services.auth_service import create_user

from app.schemas.user import UserLogin, Token
from app.services.auth_service import authenticate_user
from app.core.security import create_access_token

from fastapi import HTTPException

from app.core.security import get_current_user

from app.services.auth_service import (
    create_user,
    get_user_by_email,
    get_user_by_username,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    if get_user_by_username(db, user.username):
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    create_user(db, user)

    return {
        "message": "User created successfully"
    }


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    authenticated_user = authenticate_user(
        db,
        user.email,
        user.password,
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        data={"sub": authenticated_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.get("/me")
def get_me(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = get_user_by_email(db, current_user)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }