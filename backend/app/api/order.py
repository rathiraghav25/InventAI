from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.order import (
    OrderCreate,
    OrderUpdate,
    OrderResponse,
)

from app.services.order_service import (
    get_orders,
    get_order,
    create_order,
    update_order,
    delete_order,
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.get("/", response_model=list[OrderResponse])
def read_orders(db: Session = Depends(get_db)):
    return get_orders(db)


@router.get("/{order_id}", response_model=OrderResponse)
def read_order(order_id: str, db: Session = Depends(get_db)):
    order = get_order(db, order_id)

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return order


@router.post("/", response_model=OrderResponse)
def create_new_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
):
    return create_order(db, order)


@router.put("/{order_id}", response_model=OrderResponse)
def update_existing_order(
    order_id: str,
    order: OrderUpdate,
    db: Session = Depends(get_db),
):
    updated = update_order(db, order_id, order)

    if not updated:
        raise HTTPException(status_code=404, detail="Order not found")

    return updated


@router.delete("/{order_id}", response_model=OrderResponse)
def delete_existing_order(
    order_id: str,
    db: Session = Depends(get_db),
):
    deleted = delete_order(db, order_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Order not found")

    return deleted