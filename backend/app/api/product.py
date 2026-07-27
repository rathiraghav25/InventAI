from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)
from app.services.product_service import (
    create_product,
    get_products,
    get_product,
    update_product,
    delete_product,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


@router.get("/", response_model=list[ProductResponse])
def read_products(db: Session = Depends(get_db)):
    return get_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def read_product(product_id: str, db: Session = Depends(get_db)):
    product = get_product(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@router.post("/", response_model=ProductResponse, status_code=201)
def create_new_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
):
    return create_product(db, product)


@router.put("/{product_id}", response_model=ProductResponse)
def update_existing_product(
    product_id: str,
    product: ProductUpdate,
    db: Session = Depends(get_db),
):
    updated = update_product(db, product_id, product)

    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated


@router.delete("/{product_id}")
def remove_product(
    product_id: str,
    db: Session = Depends(get_db),
):
    deleted = delete_product(db, product_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}